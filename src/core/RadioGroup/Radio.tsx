import { useContext, createSignal } from 'solid-js'
import RadioGroupContext from './RadioGroupContext'

import { styled } from 'solid-styled-components'
import { Row } from '../../layout'
import Label from '../Label'

const BaseRadio = styled('input')`
  appearance: none;
  border: 2px solid #333;
  border-radius: 50%;
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
    width: 0.8rem;
    height: 0.8rem;
    background-color: #333;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.25s ease;
  }

  &:checked:before {
    transform: translate(-50%, -50%) scale(1);
  }
`

interface RadioProps {
  children?: never
  id?: string
  label?: string
  sublabel?: string
  size?: string
  class?: string
  value: string
  name?: string
  onChange?: (value: string) => void
}

const StyledRadio = styled(BaseRadio)<RadioProps>`
  width: ${props => props.size || '1.2rem'};
  height: ${props => props.size || '1.2rem'};
  border: ${props => (props.disabled ? '2px solid #ccc' : '2px solid #333')};
  background-color: ${props => (props.disabled ? '#ccc' : 'transparent')};
`

const Radio = (props: RadioProps) => {
  const context = useContext(RadioGroupContext)
  if (!context) {
    throw new Error('RadioButton must be used within a RadioGroup')
  }
  const { selected, setSelected, disabled } = context

  const onClick = (e: MouseEvent) => {
    e.preventDefault()
    if (disabled()) {
      return
    }
    props.onChange && props.onChange(props.value)
    setSelected(props.value)
  }

  return (
    <Row alignItems="flex-start" gap={'10px'} class={props.class}>
      <StyledRadio
        type="radio"
        id={props.id}
        disabled={disabled()}
        checked={selected() === props.value}
        onClick={onClick}
        name={props.name}
        value={props.value}
        size={props.size}
      />
      {props.label && (
        <Label
          text={props.label}
          subtext={props.sublabel}
          for={props.id}
          disabled={disabled()}
          onClick={onClick}
        />
      )}
    </Row>
  )
}

export default Radio
