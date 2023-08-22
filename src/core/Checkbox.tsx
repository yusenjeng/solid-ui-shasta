import { createEffect, createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'
import Label from './Label'
import { Row } from '../layout'

const BaseCheckbox = styled('input')`
  appearance: none;
  border: 2px solid #333;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  position: relative;
  outline: none;
  display: block;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #333;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.3s ease;
  }

  &:checked:before {
    transform: translate(-50%, -50%) scale(1);
  }
`

interface CheckboxProps {
  children?: never
  id?: string
  label?: string
  sublabel?: string
  size?: string
  inline?: boolean
  class?: string
  disabled?: boolean
  onChange?: (value: boolean) => void
}

const Checkbox = (props: CheckboxProps) => {
  const [checked, setChecked] = createSignal(false)

  createEffect(() => {
    props.onChange && props.onChange(checked())
  })

  const onClick = (e: MouseEvent) => {
    setChecked(!checked())
  }

  const StyledCheckbox = styled(BaseCheckbox)`
    width: ${props.size || '1.2rem'};
    height: ${props.size || '1.2rem'};
    border: ${props.disabled ? '2px solid #ccc' : '2px solid #333'};
    background-color: ${props.disabled ? '#ccc' : 'transparent'};
  `

  return (
    <Row alignItems="flex-start" gap={'10px'} class={props.class}>
      <StyledCheckbox
        type="radio"
        id={props.id}
        disabled={props.disabled}
        checked={checked()}
        onClick={onClick}
      />
      {props.label && <Label text={props.label} subtext={props.sublabel} for={props.id} disabled={props.disabled} />}
    </Row>
  )
}

export default Checkbox
