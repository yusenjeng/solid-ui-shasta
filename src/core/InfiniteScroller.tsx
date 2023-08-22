import { JSX, createSignal, onCleanup, onMount } from 'solid-js'
import { Dynamic, For } from 'solid-js/web'
import { styled } from 'solid-styled-components'
import { Button, Spinner, Panel } from './'
import debounce from '../utils/debounce'

const ListContainer = styled('div')<{ customStyle?: string }>`
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  scroll-behavior: smooth;
  ${props => props.customStyle}
`

const ListItem = styled('div')`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid black;
  padding: 0;
  margin: 0;
`

const Loader = styled('div')`
  height: 0;
  text-align: center;
  line-height: 50px;
  padding: 0;
  margin: 0;
`

const LoadingMask = styled('div')<{
  size?: string
  thickness?: string
  direction: ScrollDirection
}>`
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: var(--background-color);
  ${props => {
    switch (props.direction) {
      case 'up':
        return `top: 0; left: 0;`
      case 'down':
        return `bottom: 0; left: 0;`
      default:
        return `top: 0; left: 0;`
    }
  }}

  .spinner {
    position: absolute;
    top: calc(50% - ${props => props.size || '20px'} / 2 - ${props => props.thickness || '4px'});
    left: calc(50% - ${props => props.size || '20px'} / 2 - ${props => props.thickness || '4px'});
    width: ${props => props.size || '20px'};
    height: ${props => props.size || '20px'};
  }
`
type ScrollPosition = 'top' | 'bottom'
type ScrollDirection = 'up' | 'down' | 'none'
type InfiniteScrollFetcher = (direction: ScrollDirection) => Promise<boolean>
type ScrollObserver = IntersectionObserver | null

// sub-components
const RefreshButton = (props: { onClick: (event: MouseEvent) => void }) => {
  const btnRefreshStyle = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `

  return (
    <Panel height="100%" width="100%" position="absolute">
      <Button style={btnRefreshStyle} onClick={props.onClick}>
        Refresh
      </Button>
    </Panel>
  )
}

interface WaitingSpinnerProps {
  direction: ScrollDirection
  children?: any
}
const WaitingSpinner = (props: WaitingSpinnerProps) => (
  <LoadingMask {...props}>{props.children || <Spinner />}</LoadingMask>
)

interface InfiniteScrollProps {
  items: JSX.Element[]
  fetchMore: InfiniteScrollFetcher
  itemComponent?: (props: { children?: any }) => JSX.Element
  waitingComponent?: (props: { children?: any }) => JSX.Element
  startPosition?: ScrollPosition
  debounceTimeout?: number
  fetchTimeout?: number
  customClass?: string
  customStyle?: string
}

const InfiniteScroll = (props: InfiniteScrollProps) => {
  // Constants
  const DEFAULT_FETCH_TIMEOUT = 1000 * 30
  const DEFAULT_DEBOUNCE_TIMEOUT = 50

  let listContainerRef!: HTMLDivElement
  let topBoundaryRef!: HTMLDivElement
  let bottomBoundaryRef!: HTMLDivElement
  const [isFetching, setIsFetching] = createSignal(false)
  const [fetchDirection, setFetchDirection] = createSignal<ScrollDirection>('down')
  const [hasMore, setHasMore] = createSignal({ up: true, down: true, none: true })
  let fetchTimeoutId: number | null = null
  let observer: ScrollObserver = null

  // The fetchTimeout is implemented to pause the invocation of onFetchMore()
  // for a certain period of time if there were no responses from the previous
  // fetch request.
  const initializeFetchTimeout = (direction: ScrollDirection) => {
    if (!hasMore()[direction] && fetchTimeoutId === null) {
      fetchTimeoutId = window.setTimeout(() => {
        fetchTimeoutId = null
        onFetchMore(direction)
      }, props.fetchTimeout || DEFAULT_FETCH_TIMEOUT)
    }
  }

  const setScrollContainerOverflow = (value: string) => {
    const scrollContainer = topBoundaryRef.parentElement!
    scrollContainer.style.overflowY = value
  }

  const resetFetchState = () => {
    setIsFetching(false)
    setScrollContainerOverflow('auto')
  }

  const activateFetchState = () => {
    setIsFetching(true)
    setScrollContainerOverflow('hidden')
  }

  const scrollToAnchorItem = (anchorItem: Element, direction: ScrollDirection) => {
    // scroll for centering the anchorItem if direction is 'up', otherwise
    // scroll to the bottom of the list for the 'down' direction.
    direction === 'up'
      ? anchorItem?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      : bottomBoundaryRef.previousElementSibling?.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        })
  }

  const fetchMore = (direction: ScrollDirection) => {
    // Get the anchorItem before the fetchMore() is invoked, or
    // the anchorItem will be changed after the new items are loaded.
    const anchorItem = getAnchorItem(direction)

    props
      .fetchMore(direction)
      .then(isSuccess => {
        scrollToAnchorItem(anchorItem!, direction)
        setHasMore({ ...hasMore(), [direction]: isSuccess })
        resetFetchState()
      })
      .catch(err => {
        setHasMore({ ...hasMore(), [direction]: false })
        resetFetchState()
      })
  }

  const getAnchorItem = (direction: ScrollDirection = 'down') => {
    // The anchorItem is the first or last item in the list. It is used to
    // scroll the list to the correct position after the new items are loaded.
    return direction === 'up'
      ? topBoundaryRef.nextElementSibling?.firstElementChild
      : bottomBoundaryRef.previousElementSibling?.lastElementChild
  }

  // The onFetchMore() is designed to fetch more items when the scroll
  // position reaches the top or bottom of the list.
  const onFetchMore = debounce((direction: ScrollDirection) => {
    initializeFetchTimeout(direction)

    if (isFetching() || fetchTimeoutId !== null) {
      return console.log('fetching')
    }

    activateFetchState()
    fetchMore(direction)
  }, props.debounceTimeout || DEFAULT_DEBOUNCE_TIMEOUT)

  const createObserver = (callback: IntersectionObserverCallback) => {
    return new IntersectionObserver(callback)
  }

  const startObserving = () => {
    observer = createObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'top-boundry-loader') {
            setFetchDirection('up')
          } else if (entry.target.id === 'bottom-boundry-loader') {
            setFetchDirection('down')
          }
        } else {
          setFetchDirection('none')
        }
      })
    })

    observer.observe(topBoundaryRef)
    observer.observe(bottomBoundaryRef)
  }

  const stopObserving = () => {
    observer?.disconnect()
    observer = null

    if (fetchTimeoutId !== null) {
      window.clearTimeout(fetchTimeoutId)
    }
  }

  /**
   * The onWheel() is used to track user scroll events when the scroll position
   * is already at the top or bottom of the list. Debouncing is essential here
   * to prevent the onfetchMore function from being invoked excessively in a
   * short time span.
   */
  const onWheel = (e: WheelEvent) => {
    // prevent the onFetchMore() while the previous one is still running.
    if (isFetching()) {
      return
    }

    // Load more items based on scroll direction.
    // deltaY is positive when scrolling down, negative when scrolling up.
    if (e.deltaY < -80 && fetchDirection() === 'up') {
      onFetchMore('up')
    } else if (e.deltaY > 80 && fetchDirection() === 'down') {
      onFetchMore('down')
    }
  }

  onMount(() => {
    startObserving()

    listContainerRef.addEventListener('wheel', onWheel)

    if (props.startPosition === 'bottom') {
      setFetchDirection('down')
      onFetchMore('down')
    } else {
      onFetchMore('up')
      setFetchDirection('up')
    }
  })

  onCleanup(() => {
    stopObserving()
    listContainerRef.removeEventListener('wheel', onWheel)
  })

  const onClickRefresh = () => {
    onFetchMore('down')
    setFetchDirection('down')
  }

  const renderItems = () => {
    return (
      <div>
        <For each={props.items}>
          {item =>
            props.itemComponent ? (
              <Dynamic component={props.itemComponent}>{item}</Dynamic>
            ) : (
              <ListItem>{item}</ListItem>
            )
          }
        </For>
      </div>
    )
  }

  const renderWaitingSpinner = () => {
    return (
      <WaitingSpinner direction={fetchDirection()}>
        {props.waitingComponent && <Dynamic component={props.waitingComponent} />}
      </WaitingSpinner>
    )
  }

  return (
    <ListContainer ref={listContainerRef} class={props.customClass} customStyle={props.customStyle}>
      {isFetching() && renderWaitingSpinner()}
      {!props.items.length && <RefreshButton onClick={onClickRefresh} />}

      <Loader ref={topBoundaryRef} id="top-boundry-loader" />
      {renderItems()}
      <Loader ref={bottomBoundaryRef} id="bottom-boundry-loader"></Loader>
    </ListContainer>
  )
}

export { InfiniteScroll }
export type { ScrollDirection, InfiniteScrollFetcher }
