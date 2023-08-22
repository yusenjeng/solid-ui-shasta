import { JSX, createSignal, onMount } from 'solid-js'
import { styled } from 'solid-styled-components'
import { Panel } from '../'

interface StyledDrawerProps {
  isOpen: boolean
  side: 'left' | 'right'
  width?: string
  rounded?: string
  withHandler?: boolean
}

const StyledDrawer = styled('div')<StyledDrawerProps>`
  position: sticky;
  top: 0;
  bottom: 0;
  width: ${props => props.width || 'var(--drawer-width)'};
  height: 100%;
  color: var(--color-primary);
  background-color: var(--drawer-bg-color);
  transition: transform 0.3s ease-in-out;
  z-index: 9999;
  overflow-x: hidden;
  overflow-y: auto;

  border-left: 1px solid var(--drawer-border-color);
  border-right: 1px solid var(--drawer-border-color);

  transform: translateX(
    ${props => {
      if (props.withHandler) {
        return props.isOpen
          ? '0%'
          : props.side === 'left'
          ? 'calc(-100% + 16px)'
          : 'calc(100% - 16px)'
      }
      return props.isOpen ? '0%' : props.side === 'left' ? '-100%' : '100%'
    }}
  );

  opacity: ${props => (props.isOpen ? '1' : '0.2')};

  ${props => (props.side === 'left' ? 'left: 0;right:auto;' : 'left: 100%;right:auto;')}

  ${props =>
    props.rounded && props.side === 'left'
      ? `
    border-top-right-radius: ${props.rounded};
    border-bottom-right-radius: ${props.rounded};
    `
      : `
    border-top-left-radius: ${props.rounded};
    border-bottom-left-radius: ${props.rounded};
    `}

  &:hover {
    opacity: 1;
  }
`

const DrawerHandler = styled('div')<{ side: string }>`
  position: absolute;
  top: 50%;
  bottom: 0;
  left: ${props => (props.side === 'left' ? 'auto' : '4px')};
  right: ${props => (props.side === 'left' ? '4px' : 'auto')};
  width: 6px;
  height: 30px;
  cursor: pointer;
  z-index: 9999;
  transform: translateY(-50%);
  background-color: var(--drawer-handler-bg-color);
  border-radius: 3px;
  cursor: grab;
  &:hover {
    background-color: var(--drawer-handler-bg-color-hover);
  }
`
interface DrawerProps {
  children: JSX.Element | JSX.Element[]
  isOpen: boolean
  side: 'left' | 'right'
  width?: string
  rounded?: string
  onHandleClick?: () => void
}

const Drawer = (props: DrawerProps) => {
  return (
    <StyledDrawer
      isOpen={props.isOpen}
      side={props.side}
      width={props.width}
      rounded={props.rounded}
      withHandler={!!props.onHandleClick}
    >
      {props.onHandleClick && (
        <DrawerHandler class='drawer-handler' side={props.side} onClick={()=>props.onHandleClick&&props.onHandleClick()} />
      )}
      <Panel>{props.children}</Panel>
    </StyledDrawer>
  )
}

export default Drawer
