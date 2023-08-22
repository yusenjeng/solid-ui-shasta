import { styled } from 'solid-styled-components'
import { Popover, PopoverPosition } from './Popover'

const BaseContent = styled('div')<{ width?: string }>`
  background-color: var(--tooltip-background-color);
  color: var(--tooltip-color);
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  min-width: 60px;
  max-width: ${p => p.width || '200px'};
  min-height: 20px;
  max-height: 200px;
  width: max-content;
  height: max-content;
  overflow: hidden;
`

interface TooltipProps {
  text: string
  children: any
  customStyle?: string
  width?: string
  position?: PopoverPosition
}

const Tooltip = (props: TooltipProps & { customStyle?: string }) => {
  return (
    <Popover
      trigger="hover"
      position={props.position}
      customStyle={props.customStyle}
      content={<BaseContent width={props.width}>{props.text}</BaseContent>}
    >
      {props.children}
    </Popover>
  )
}

export default Tooltip
