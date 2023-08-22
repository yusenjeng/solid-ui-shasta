import { For, JSX, children, createEffect, createMemo, createSignal, onCleanup } from 'solid-js'
import { styled } from 'solid-styled-components'
import Radio from './Radio'
import Label from '../Label'
import RadioGroupContext from './RadioGroupContext'
import { Row, Column } from '../../layout'

interface RadioGroupProps {
  children: JSX.Element | JSX.Element[]
  label: string
  selectedOption?: string
  disabled?: boolean
  inline?: boolean
  class?: string
  onChange?: (selectedOption: string) => void
}

const RadioGroup = (props: RadioGroupProps) => {
  const [selected, setSelected] = createSignal(props.selectedOption || '')
  const [disabled] = createSignal(props.disabled || false); 

  createEffect(() => {
    props.onChange && props.onChange(selected());
  })

  const Container: typeof Row | typeof Column = props.inline ? Row : Column

  return (
    <Column alignItems="baseline" gap="0.375rem" class={props.class}>
      {props.label && <Label text={props.label} disabled={disabled()} />}
      <Container alignItems="baseline" gap={props.inline ? '0.75rem' : '0.375rem'}>
        <RadioGroupContext.Provider value={{ selected, setSelected, disabled }}>
          {props.children}
        </RadioGroupContext.Provider>
      </Container>
    </Column>
  )
}

export default RadioGroup
