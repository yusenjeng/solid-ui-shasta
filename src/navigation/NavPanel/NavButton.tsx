import { styled } from 'solid-styled-components'
import { IconButton } from '../../'

const BaseNavButton = styled(IconButton)`
  padding: 0;
  margin: 0;
  border-width: 1px;

  &:hover{
    border-width: 1px;
  }
`

interface NavButtonProps {
  icon: string
  label?: string
  size?: string
  onClick?: () => void
}

const NavButton = (props: NavButtonProps) => {

  return (
    <BaseNavButton
      icon={props.icon}
      onClick={props.onClick || (() => {})}
      circle
      width={props.size || '2rem'}
      height={props.size || '2rem'}
    />
  )
}

export default NavButton
