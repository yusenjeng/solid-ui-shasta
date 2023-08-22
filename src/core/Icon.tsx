import { styled } from 'solid-styled-components'

const BaseIcon = styled('i')<{ color?: string; size?: string; scale?: string }>`
  display: inline-block;
  background-color: transparent;
  padding: 0;
  margin: 0;
  border: none;
  transition: 0.2s ease;
  color: ${props => props.color};
  width: ${props => props.size};
  height: ${props => props.size};
  transform: scale(${props => parseFloat(props.scale ?? '1')});
`

interface IconProps {
  children?: never
  color?: string
  icon?: string
  size?: string
  disabled?: boolean
  scale?: string
}

const Icon = (props: IconProps) => {
  return (
    <BaseIcon
      class={props.icon}
      size={props.size ?? '1rem'}
      scale={props.scale ?? '1'}
      color={props.disabled ? 'var(--color-disabled)' : props.color ?? 'var(--color-primary)'}
    />
  )
}

export default Icon
