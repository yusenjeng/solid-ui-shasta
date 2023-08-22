import { JSX, useContext } from 'solid-js'
import { styled } from 'solid-styled-components'
import { Column, Icon, Text } from '../../'
import NavPanelContext from './NavPanelContext'

const BaseNavLink = styled('a')`
  text-decoration: none;
  color: var(--navpanel-item-color);
  width: var(--navpanel-item-width);  
  min-width: var(--navpanel-item-width);
  max-width: var(--navpanel-item-width);

  min-height: var(--navpanel-item-height);
  /* transition: color 0.5s ease, background-color 0.3s ease; */
  border-right: 3px solid transparent;
  text-align: center;
  padding: 1rem 0.5rem;

  &:hover {
    text-decoration: none;
    color: var(--navpanel-item-color);
    background-color: var(--navpanel-item-bg-color-hover);
  }

  &.active {
    filter: var(--elevation-moderate-filter);
    text-decoration: none;
    color: var(--navpanel-item-color);
    background-color: var(--navpanel-item-bg-color-active);
    border-right: 3px solid var(--navpanel-item-border-color-active);
  }
`

interface NavLinkProps {
  children?: JSX.Element | JSX.Element[]
  href: string
  icon?: string
  text?: string
  class?: string
  active?: boolean
  onClick?: (href?: string) => void
}

const NavLink = (props: NavLinkProps) => {
  const context = useContext(NavPanelContext)
  if (!context) {
    throw new Error('RadioButton must be used within a RadioGroup')
  }
  const { activeLink, setActiveLink } = context

  const onClick = () => {
    setActiveLink(props.href)
    props.onClick && props.onClick(props.href)
  }

  return (
    <BaseNavLink
      href={props.href}
      class={activeLink() === props.href ? 'active' : ''}
      onClick={onClick}
    >
      <Column>
        {props.icon && (
          <Icon
            icon={props.icon}
            color={'var(--navpanel-item-color)'}
            scale='1.5'
          />
        )}
        {props.text}
      </Column>
    </BaseNavLink>
  )
}

export default NavLink
