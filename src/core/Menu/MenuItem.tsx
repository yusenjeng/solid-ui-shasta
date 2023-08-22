import { styled } from 'solid-styled-components'
import { JSX } from 'solid-js'

const BaseMenuItem = styled('li')<{ padding?: string }>`
  padding: ${props => props.padding ?? 'var(--menu-item-padding)'};
  cursor: pointer;
  font-weight: var(--menu-item-font-weight);
  &:hover {
    background-color: var(--menu-item-bg-color-hover);
  }
`

interface MenuItemProps {
  children?: JSX.Element
  padding?: string
  key?: string
  onClick?: (key?: string) => void
}

const MenuItem = (props: MenuItemProps) => {
  const onClick = (event: MouseEvent) => {
    props.onClick && props.onClick(props.key)
  }

  return <BaseMenuItem onClick={onClick}>{props.children}</BaseMenuItem>
}

export default MenuItem
