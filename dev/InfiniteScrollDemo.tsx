import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { styled } from 'solid-styled-components'
import {
  Drawer,
  Button,
  Text,
  Row,
  Panel,
  InfiniteScroll,
  InfiniteScrollFetcher,
} from '../src'

const ListItem = styled('div')`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid black;
  padding: 0;
`

const Dot = styled('div')`
  background-color: #333;
  border-radius: 100%;
  width: 0.5rem;
  height: 0.5rem;
  margin: 2rem 0.5rem;
  animation-fill-mode: both;
  animation: dotPulse 1.0s infinite linear;
  animation-delay: calc(0.25s * var(--i));

  @keyframes dotPulse {
    0% {
      transform: scale(0.75);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.75);
    }
  }
`;

const SpinnerWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = () => (
  <SpinnerWrapper>
    <Dot style={{ "--i": 0 }} />
    <Dot style={{ "--i": 1 }} />
    <Dot style={{ "--i": 2 }} />
  </SpinnerWrapper>
);


const InfiniteScrollDemo = () => {
  const [isOpen, setIsOpen] = createSignal(false)

  const onHandleClick = () => {
    setIsOpen(!isOpen())
  }

  const [items, setItems] = createSignal<string[]>([])

  const fetchMore: InfiniteScrollFetcher = async direction => {
    if (items().length >= 200) {
      return false
    }

    await new Promise(resolve => setTimeout(resolve,100))

    const newItems = new Array(20).fill(null).map((_, i) => `Item ${items().length + i + 1}`)
    setItems(direction === 'down' ? items().concat(newItems) : newItems.concat(items()))
    return true
  }

  return (
    <Panel noscroll>
      <Row width="100%" height="100%" justifyContent="space-between" flexWrap="nowrap" gap="0">
        <Panel width="300px">
          <InfiniteScroll
            items={items()}
            fetchMore={fetchMore}
            startPosition='top'
            itemComponent={ListItem}
            waitingComponent={Spinner}
          />
        </Panel>
        <Panel width="calc(100% - 300px)">
          <Button>Change Item</Button>
        </Panel>
      </Row>

      <Drawer isOpen={isOpen()} side="right" rounded="1rem" onHandleClick={onHandleClick}>
        <Text>test</Text>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
        <Button onClick={() => setIsOpen(true)}>Open</Button>
      </Drawer>
    </Panel>
  )
}

export default InfiniteScrollDemo
