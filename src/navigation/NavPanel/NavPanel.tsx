import { JSX, createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'
import NavPanelContext from './NavPanelContext'

const BaseNavPanel = styled('div')<NavPanelProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-wrap: nowrap;
  padding: ${props => props.padding};
  min-width: var(--navpanel-min-width);
  background-color: var(--navpanel-background-color);
  height: ${props => props.height};
  width: ${props => props.width};
`

interface NavPanelProps {
  children?: JSX.Element | JSX.Element[]
  width?: string
  height?: string
  padding?: string
}

const NavPanel = (props: NavPanelProps) => {
  const [activeLink, setActiveLink] = createSignal('')

  return (
    <NavPanelContext.Provider value={{ activeLink, setActiveLink }}>
      <BaseNavPanel
        width={props.width || 'var(--navpanel-width)'}
        height={props.height || '100%'}
        padding={props.padding || 'var(--navpanel-padding)'}
      >
        {props.children}
      </BaseNavPanel>
    </NavPanelContext.Provider>
  )
}

export default NavPanel
