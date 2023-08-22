import { Component, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { styled } from 'solid-styled-components'
import { IconButton, Button } from '../core'
import { Row } from '../layout'

const ArrowButton = styled(IconButton)`
  width: 2rem;
  height: 2rem;
  padding: 0;
  margin: 0;
  color: var(--pagination-selected-color);
  background-color: transparent;
  border: 0;
  &:hover {
    border: 0;
    box-shadow: none;
  }
  &:active {
    box-shadow: none;
  }
`

const PageButton = styled(Button)<{ color: string, bgColor: string, hoverBorderColor:string}>`
  width: 2rem !important;
  height: 2rem !important;
  min-width: 2rem !important;
  min-height: 2rem !important;
  padding: 0 !important;
  margin: 0 0.2rem !important;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  border: 1px solid ${props => props.bgColor};
  border-radius: 0.2rem !important;
  &:hover {
    border: 1px solid ${props => props.hoverBorderColor};
    color: ${props => props.bgColor};
    background-color: ${props => props.bgColor};;
    box-shadow: none;
    div {
      color: ${props => props.color};
    }
  }

  div {
    color: ${props => props.color};
  }
`

const PageButtonGroup = styled('div')`
  overflow: hidden;
  background: transparent;
`

interface PaginationProps {
  total: number
  limit: number
  offset: number
  onChange: (newOffset: number) => void
}

const Pagination: Component<PaginationProps> = props => {
  const inputOffset = Math.max(1, Math.min(props.total, props.offset))
  const [offset, setOffset] = createSignal(inputOffset)
  const totalPages = Math.ceil(props.total / props.limit)

  let offsetGroupRef: HTMLDivElement
  let animation: Animation | null = null

  const calculatePage = () => {
    return Math.floor((offset() - 1) / props.limit)
  }

  const animateOffsetGroup = (animationConfig: Keyframe[]) => {
    animation && animation.cancel()
    animation = offsetGroupRef.animate(animationConfig, { duration: 500, easing: 'ease-in-out' })
  }

  const goPreviousPage = () => {
    if (calculatePage() <= 0) return

    setOffset(offset() - props.limit)
    animateOffsetGroup([
      { transform: 'translateX(0)', opacity: 1, offset: 0 },
      { transform: 'translateX(100%)', opacity: 0, offset: 0.1 },
      { transform: 'translateX(-100%)', opacity: 0, offset: 0.5 },
      { transform: 'translateX(0)', opacity: 1, offset: 1 },
    ])
  }

  const goNextPage = () => {
    if (calculatePage() >= totalPages - 1) return

    setOffset(offset() + props.limit)
    animateOffsetGroup([
      { transform: 'translateX(0)', opacity: 1, offset: 0 },
      { transform: 'translateX(-50%)', opacity: 0, offset: 0.1 },
      { transform: 'translateX(-100%)', opacity: 0, offset: 0.2 },
      { transform: 'translateX(100%)', opacity: 0, offset: 0.5 },
      { transform: 'translateX(0)', opacity: 1, offset: 1 },
    ])
  }

  const onClickOffset = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement
    const newOffset = parseInt(target.innerText)
    setOffset(newOffset)
  }

  onMount(() => {
    onCleanup(() => animation && animation.cancel())
  })

  createEffect(() => {
    props.onChange(offset())
  })

  // TODO: add active and hover states

  return (
    <Row gap="0">
      <ArrowButton icon="iconoir-nav-arrow-left" onClick={goPreviousPage} />
      <PageButtonGroup ref={(el: HTMLDivElement) => (offsetGroupRef = el)}>
        {Array.from({ length: totalPages }).map((_, index) => {
          const buttonOffset = calculatePage() * props.limit + index + 1
          return (
            <PageButton
              color={
                buttonOffset === offset()
                  ? 'var(--pagination-selected-text-color)'
                  : 'var(--text-color)'
              }
              bgColor={
                buttonOffset === offset() ? 'var(--pagination-selected-bg-color)' : 'transparent'
              }

              hoverBorderColor={
                buttonOffset === offset() ? 'var(--pagination-selected-bg-color)': 'var(--pagination-selected-bg-color)'
              }
              
              key={`${index}`}
              onClick={onClickOffset}
            >
              {buttonOffset}
            </PageButton>
          )
        })}
      </PageButtonGroup>
      <ArrowButton icon="iconoir-nav-arrow-right" onClick={goNextPage} />
    </Row>
  )
}

export default Pagination
