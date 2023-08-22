import { styled } from 'solid-styled-components'
import IconButton from './IconButton'

const BaseDotButton = styled(IconButton)<{ margin?: string; padding?: string }>`
  margin: ${props => (props.margin ? props.margin : '0')};
  padding: ${props => (props.padding ? props.padding : '0')};
  border: var(--dot-button-border-width) solid var(--button-border-color);
`

interface CornerActionButtonProps {
  onClick?: () => void
  icon: string
  square?: boolean
  margin?: string
  padding?: string
}

const DotButton = (props: CornerActionButtonProps) => {
  const onClick = props.onClick || (() => {})

  return (
    <BaseDotButton
      width="1.5rem"
      height="1.5rem"
      icon={props.icon}
      iconScale='0.8'
      circle={!props.square}
      margin={props.margin}
      padding={props.padding}
      onClick={() => onClick()}
    />
  )
}

export default DotButton
