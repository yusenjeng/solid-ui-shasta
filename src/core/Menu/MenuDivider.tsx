import Divider from "../Divider";

interface MenuDividerProps {
  children?: never
  height?: string
}

const MenuDivider = (props : MenuDividerProps) => {
  return <Divider height={props.height ?? 'var(--menu-border-width)'} width={'100%'} margin='0' />
}

export default MenuDivider
