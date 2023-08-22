import { styled } from 'solid-styled-components'
import Text from './Text'

interface BaseLabelProps {
  children?: any
  text?: string
  subtext?: string
  htmlFor?: string
  disabled?: boolean
  onClick?: (e: MouseEvent) => void
}

const BaseLabel = styled('label')<BaseLabelProps>`
  color: var(--color-primary);
  display: block;

  span {
    font-size: 0.8rem;
    color: var(--color-gray-3);
    margin-left: 0.2rem;
  }
`

interface LabelProps extends Omit<BaseLabelProps, 'htmlFor'> {
  for?: string
  color?: string
}

const StyledLabel = styled(BaseLabel)<LabelProps>`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

const Label = (props: LabelProps) => {
  return (
    <StyledLabel htmlFor={props.for} disabled={props.disabled} onClick={props.onClick} color={props.color}>
      <Text weight='bold' disabled={props.disabled}>{props.text}</Text>
      {props.subtext && <span>( {props.subtext} )</span>}
    </StyledLabel>
  )
}

export default Label
