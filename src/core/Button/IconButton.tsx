import Button from './Button'
import Icon from '../Icon'
import Text from '../Text'
import { Row } from '../../layout'
import { styled } from 'solid-styled-components'

const BaseIconButton = styled(Button)<{ rounded?: string }>`
  border-radius: ${props => props.rounded + '!important' || '0'};
`

interface IconButtonProps {
  onClick?: () => void
  disabled?: boolean
  width?: string
  height?: string
  text?: string
  gap?: string
  icon?: string
  iconSize?: string
  iconScale?: string
  iconColor?: string
  circle?: boolean
  noBorder?: boolean
  rounded?: string
  style?: string
  class?: string
  children?: never
}

const IconButton = (props: IconButtonProps) => {
  const handleClick = () => {
    props.onClick && props.onClick()
  }

  return (
    <BaseIconButton
      onClick={handleClick}
      disabled={props.disabled}
      gap={props.gap || '0'}
      rounded={props.rounded}
      circle={props.circle}
      noBorder={props.noBorder}
      width={props.width}
      height={props.height}
      style={props.style}
      class={props.class}
    >
      {props.icon && (
        <Icon
          icon={props.icon}
          disabled={props.disabled}
          size={props.iconSize}
          scale={props.iconScale}
          color={props.iconColor}
        />
      )}
      {props.text && <Text disabled={props.disabled}>{props.text}</Text>}
    </BaseIconButton>
  )
}

export default IconButton
