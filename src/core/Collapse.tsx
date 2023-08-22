import { JSX, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { styled } from 'solid-styled-components'

type CollapseDirection = 'top' | 'bottom' | 'left' | 'right'

interface CollapseWrapperProps {
  isOpen: boolean
  size: string
  direction: CollapseDirection
}

const CollapseWrapper = styled('div')<CollapseWrapperProps>`
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  width: 100%;
  height: 100%;

  ${props => {
    switch (props.direction) {
      case 'top':
        return `margin-top: -${props.size};`
      case 'bottom':
        return `margin-top: ${props.size};`
      case 'left':
        return `margin-left: -${props.size};`
      case 'right':
        return `margin-left: ${props.size};`
    }
  }}
`

interface CollapseProps {
  isOpen: boolean
  direction: CollapseDirection
  children: JSX.Element | JSX.Element[]
}

const Collapse = (props: CollapseProps) => {
  let wrapperRef!: HTMLDivElement
  const [size, setSize] = createSignal('0px')

  createEffect(() => {
    if (!props.isOpen) {
      switch (props.direction) {
        case 'top':
          setSize(`100%`)
          break
        case 'bottom':
          setSize(`200%`)
          break
        case 'left':
          setSize(`100%`)
          break
        case 'right':
          setSize(`200%`)
          break
      }
    } else {
      setSize('0px')
    }
  })

  // resize function to adjust the size when window is resized
  const resize = () => {
    if (!props.isOpen) {
      switch (props.direction) {
        case 'top':
          setSize(`100%`)
          break
        case 'bottom':
          setSize(`200%`)
          break
        case 'left':
          setSize(`100%`)
          break
        case 'right':
          setSize(`200%`)
          break
      }
    } else {
      setSize('0px')
    }
  }

  onMount(() => {
    window.addEventListener('resize', resize)
    resize()
  })
  onCleanup(() => window.removeEventListener('resize', resize))

  return (
    <CollapseWrapper
      isOpen={props.isOpen}
      direction={props.direction}
      size={size()}
      ref={wrapperRef}
    >
      {props.children}
    </CollapseWrapper>
  )
}

export default Collapse
export type { CollapseDirection }
