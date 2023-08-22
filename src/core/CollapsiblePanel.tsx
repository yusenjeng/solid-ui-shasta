import { styled } from 'solid-styled-components'
import Collapse, { CollapseDirection } from './Collapse'
import { JSX } from 'solid-js'

const BaseCollapsiblePanel = styled('div')<{ width?: string; height?: string }>`
  border: 1px solid #000;
  width: ${props => props.width};
  height: ${props => props.height};
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
`

interface CollapsiblePanelProps {
  direction: CollapseDirection
  isOpen: boolean
  children: JSX.Element | JSX.Element[]
  width?: string
  height?: string
}

const CollapsiblePanel = (props: CollapsiblePanelProps) => {
  return (
    <BaseCollapsiblePanel width={props.width || '400px'} height={props.height || '300px'}>
      <Collapse isOpen={props.isOpen} direction={props.direction || 'bottom'}>
        {props.children}
      </Collapse>
    </BaseCollapsiblePanel>
  )
}

export default CollapsiblePanel
