import { JSX } from 'solid-js'
import { styled } from 'solid-styled-components'

const BasePanel = styled('div')<PanelProps>`
  overflow-y: auto;
  overflow-x: hidden;
  position: ${props => props.position};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  width: ${props => props.width};
  /* min-width: ${props => props.width}; */
  /* max-width: ${props => props.width}; */

  height: ${props => props.height};
  /* min-height: ${props => props.height}; */
  /* max-height: ${props => props.height}; */
  
  background-color: var(--background-color);
  overflow: ${props => props.noscroll? 'hidden' : 'auto'};
  display: inline-block;

  ${props => props.customStyle}
`

interface PanelProps {
  children: JSX.Element | JSX.Element[]
  padding?: string
  margin?: string
  width?: string
  height?: string
  noscroll?: boolean
  position?: string
  customStyle?: string
  customClass?: string
}

const Panel = (props: PanelProps) => {
  return <BasePanel
    padding={props.padding || '0'}
    margin={props.margin || '0'}
    width={props.width || '100%'}
    height={props.height || '100vh'}
    position={props.position || 'relative'}
    noscroll={props.noscroll}
    customStyle={props.customStyle}
    class={props.customClass}
  >
    {props.children}</BasePanel>
}

export default Panel
