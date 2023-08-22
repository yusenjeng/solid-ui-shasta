import { JSX, createEffect, createSignal, on, onCleanup, onMount } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { styled } from 'solid-styled-components'
import { Row } from '../layout'

type CSSProperties = string

const PopoverWrapper = styled('div')<{ customStyle?: CSSProperties }>`
  position: relative;
  display: inline-block;
  ${p => p.customStyle || ''}
`

const BaseContent = styled('div')<{ width?: string }>`
  width: fit-content;
  height: fit-content;

  font-size: var(--popover-font-size);
  color: var(--popover-color);
  background-color: transparent;
  padding: 0;
  border: 0;
  border-radius: 0;
  text-align: center;
  position: absolute;
  z-index: 9999;
  transition: all 0.2s;
`

const ContentTop = styled(BaseContent)`
  top: auto;
  bottom: calc(100% + 8px);
  left: 50%;
  right: auto;
  transform: translateX(-50%);
`

const ContentTopLeft = styled(BaseContent)`
  top: auto;
  bottom: calc(100% + 8px);
  left: auto;
  right: calc(100% - 14px);
  transform: translate(0);
`

const ContentTopRight = styled(BaseContent)`
  top: auto;
  bottom: calc(100% + 8px);
  left: calc(100% - 14px);
  right: auto;
  transform: translate(0);
`

const ContentLeft = styled(BaseContent)`
  top: 50%;
  bottom: auto;
  left: auto;
  right: calc(100% + 10px);
  transform: translateY(-50%);
`

const ContentLeftTop = styled(BaseContent)`
  top: auto;
  bottom: calc(100% - 12px);
  left: auto;
  right: calc(100% + 10px);
  transform: translateY(-0);
`

const ContentLeftBottom = styled(BaseContent)`
  top: calc(100% - 12px);
  bottom: auto;
  left: auto;
  right: calc(100% + 10px);
  transform: translateY(0);
`

const ContentBottom = styled(BaseContent)`
  top: calc(100% + 8px);
  bottom: auto;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
`
const ContentBottomLeft = styled(BaseContent)`
  top: calc(100% + 8px);
  bottom: auto;
  left: auto;
  right: calc(100% - 12px);
  transform: translateX(0);
`

const ContentBottomRight = styled(BaseContent)`
  top: calc(100% + 8px);
  bottom: auto;
  left: calc(100% - 12px);
  right: auto;
  transform: translateX(0);
`

const ContentRight = styled(BaseContent)`
  top: 50%;
  bottom: auto;
  left: calc(100% + 10px);
  right: auto;
  transform: translateY(-50%);
`

const ContentRightTop = styled(BaseContent)`
  top: auto;
  bottom: calc(100% - 12px);
  left: calc(100% + 10px);
  right: auto;
  transform: translateY(0);
`

const ContentRightBottom = styled(BaseContent)`
  top: calc(100% - 12px);
  bottom: auto;
  left: calc(100% + 10px);
  right: auto;
  transform: translateY(0);
`

const POPOVER_CONTENT_MAP = {
  left: ContentLeft,
  'left-top': ContentLeftTop,
  'left-bottom': ContentLeftBottom,
  right: ContentRight,
  'right-top': ContentRightTop,
  'right-bottom': ContentRightBottom,
  top: ContentTop,
  'top-left': ContentTopLeft,
  'top-right': ContentTopRight,
  bottom: ContentBottom,
  'bottom-left': ContentBottomLeft,
  'bottom-right': ContentBottomRight,
}

type PopoverPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom'

interface PopoverProps {
  position?: PopoverPosition
  children: JSX.Element | JSX.Element[]
  customStyle?: CSSProperties
  width?: string
  content: JSX.Element | JSX.Element[]
  key?: string
  trigger?: 'click' | 'hover'
}

const Popover = (props: PopoverProps) => {
  if (typeof props.content === 'string' || typeof props.content === 'boolean') {
    throw new Error('Popover content must be a JSX element')
  }

  props.key && console.log(props.content)

  const [visible, setVisible] = createSignal(false)
  let popoverRef: HTMLDivElement

  // close popover when click outside
  const onClickWindow = (event: MouseEvent) => {
    if (!popoverRef.contains(event.target as Node)) {
      setVisible(false)
    }
  }

  const onClick = (e: Event) => {
    setVisible(!visible())
  }

  const onMouseEnter = () => setVisible(true)
  const onMouseLeave = () => setVisible(false)
  const eventHandlers =
    props.trigger === 'hover'
      ? {
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
        }
      : {
          onClick: onClick,
        }

  onMount(() => {
    if (props.trigger !== 'hover') {
      window.addEventListener('click', onClickWindow)
    }
  })

  onCleanup(() => {
    if (props.trigger !== 'hover') {
      window.removeEventListener('click', onClickWindow)
    }
  })

  return (
    <PopoverWrapper
      ref={(el: HTMLDivElement) => (popoverRef = el)}
      customStyle={props.customStyle}
      {...eventHandlers}
    >
      <Dynamic
        component={POPOVER_CONTENT_MAP[props.position || 'right']}
        style={{
          visibility: visible() ? 'visible' : 'hidden',
          opacity: visible() ? 1 : 0,
        }}
      >
        <Row>{props.content}</Row>
      </Dynamic>
      {props.children}
    </PopoverWrapper>
  )
}

export { Popover }
export type { PopoverPosition }
