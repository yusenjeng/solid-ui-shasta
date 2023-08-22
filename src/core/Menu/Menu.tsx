import { styled } from 'solid-styled-components'
import { JSX } from 'solid-js'

const BaseMenu = styled('ul')<MenuProps>`
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: var(--menu-background-color);
  border: var(--menu-border-width) solid var(--menu-border-color);
  box-shadow: var(--menu-box-shadow);
  width: ${props => props.width ?? 'var(--menu-width)'};
`

type MenuProps = {
  children?: JSX.Element | JSX.Element[]
  width?: string
}

const Menu = (props: MenuProps) => {
  return <BaseMenu width={props.width}>{props.children}</BaseMenu>
}

export default Menu
