import { createEffect, createSignal } from 'solid-js'
import IconButton from './IconButton'
import Button from './Button'
import { styled } from 'solid-styled-components'

const BaseToggleButton = styled(IconButton)<{
  bgColor?: string
  isActive?: boolean
  noBorder?: boolean
  disabled?: boolean
}>`
  background-color: ${props => props.bgColor};
  border: ${props =>
    props.noBorder
      ? '0'
      : props.isActive
      ? 'var(--toggle-button-border-width) solid var(--toggle-button-border-color-active)'
      : 'var(--toggle-button-border-width) solid var(--button-border-color)'};

  &:hover {
    background-color: ${props => props.disabled ? '' : props.bgColor};
    border: ${props =>
      props.noBorder
        ? '0'
        : props.isActive
        ? 'var(--toggle-button-border-width) solid var(--toggle-button-border-color-active)'
        : 'var(--toggle-button-border-width) solid var(--button-border-color)'};
    box-shadow: ${props =>
      props.isActive
        ? 'var(--elevation-ground-box-shadow)'
        : 'var(--elevation-moderate-box-shadow)'};
  }
`

interface ToggleButtonProps {
  activeColor?: string
  disabled?: boolean
  gap?: string
  width?: string
  height?: string
  icon?: string
  iconScale?: string
  inactiveColor?: string
  onChange?: (isActive: boolean) => void
  circle?: boolean
  rounded?: string
  noBorder?: boolean
  text?: string
  style?: string
  class?: string
  children?: never
  key?: string
}

const ToggleButton = (props: ToggleButtonProps) => {
  const [isActive, setIsActive] = createSignal(false)
  const [activeBG] = createSignal(props.activeColor || 'var(--toggle-button-bg-active)')
  const [inactiveBG] = createSignal(props.inactiveColor || 'var(--button-bg-color)')
  const [currentBgColor, setCurrentBgColor] = createSignal(inactiveBG())

  const toggleIsActive = () => {
    setIsActive(!isActive())
  }

  createEffect(() => {
    props.key && console.log(props.key, isActive() ? activeBG() : inactiveBG())
    setCurrentBgColor(isActive() ? activeBG() : inactiveBG())
    props.onChange && props.onChange(isActive())
  })

  return (
    <BaseToggleButton
      icon={props.icon}
      text={props.text}
      rounded={props.rounded}
      circle={props.circle}
      noBorder={props.noBorder}
      width={props.width}
      height={props.height}
      bgColor={currentBgColor()}
      onClick={toggleIsActive}
      iconScale={props.iconScale}
      disabled={props.disabled}
      gap={props.gap}
      style={props.style}
      class={props.class}
      isActive={isActive()}
    />
  )
}

export default ToggleButton
