import { createEffect, createMemo, createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'
import {Row} from '../layout'
import Label from './Label'

const BaseSwitch = styled('div')`
  position: relative;
  display: inline-block;
  width: 2.25rem;
  height: 1.275rem;
`

const Input = styled('input')`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #2196f3;
  }

  &:focus + span {
    box-shadow: 0 0 0.0375rem #2196f3;
  }

  &:checked + span:before {
    transform: translateX(0.975rem);
  }

  &:disabled + span {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:disabled + span:before {
    background-color: #bbb;
  }
`

const Slider = styled('span')`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 1.329rem;

  &:before {
    position: absolute;
    content: '';
    height: 0.975rem;
    width: 0.975rem;
    left: 0.15rem;
    bottom: 0.15rem;
    background-color: white;
    transition: 0.4s;
  }

  &:before {
    border-radius: 50%;
  }
`
type IndicatorAlign = 'left' | 'right';

interface SwitchProps {
  children?: never
  id?: string
  label?: string
  sublabel?: string
  class?: string
  disabled?: boolean
  checked?: boolean
  indicatorAlign?: IndicatorAlign
  onChange?: (value: boolean) => void
}

const Switch = (props: SwitchProps) => {
  const [checked, setChecked] = createSignal(props.checked || false)

  const isDisabled = createMemo(() => props.disabled || false);
  
  createEffect(() => {
    if (isDisabled()) {
      return
    }
    props.onChange && props.onChange(checked())
  })

  const onClick = (e: Event) : void => {
    if (isDisabled()) {
      return
    }
    setChecked(!checked())
  }

  const isIndicatorOnRight = props.indicatorAlign === 'right'

  return (
    <Row alignItems="center" justifyContent={isIndicatorOnRight? 'space-between': 'flex-start' } gap={'10px'} class={props.class}>
      {props.label && isIndicatorOnRight && (
        <Label
          text={props.label}
          subtext={props.sublabel}
          for={props.id}
          disabled={props.disabled}
        />
      )}

      <BaseSwitch>
        <Input type="checkbox" id={props.id} checked={checked()} disabled={props.disabled} />
        <Slider onClick={onClick}></Slider>
      </BaseSwitch>

      {props.label && !isIndicatorOnRight && (
        <Label
          text={props.label}
          subtext={props.sublabel}
          for={props.id}
          disabled={props.disabled}
        />
      )}
    </Row>
  )
}

export default Switch
