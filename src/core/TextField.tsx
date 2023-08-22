import { createEffect, createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'
import Label from './Label'
import { Row, Column } from '../layout'

const BaseTextField = styled('input')`
  width: 100%;
  color: var(--color-primary);
  background-color: var(--color-white);
  border: none;
  border-bottom: 2px solid var(--color-dark-2);
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 400;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: var(--color-gray-3);
    opacity: 1; /* Firefox */
  }
  &:disabled{
    background-color: var(--color-disabled);
    border-bottom: 0;
  }
`

interface TextFieldProps {
  children?: any
  placeholder?: string
  value?: string
  maxLength?: number
  disabled?: boolean
  selectOnFocus?: boolean
  id?: string
  label?: string
  sublabel?: string
  onChange?: (value: string | undefined) => void
  onEnter?: (value: string | undefined) => void
  width?: string
  inline?: boolean
  class?: string
}

const TextField = ({ maxLength, disabled, selectOnFocus, width, ...props }: TextFieldProps) => {
  const [value, setValue] = createSignal(props.value)

  const onChange = (e: InputEvent) => {
    const newValue = (e.target as HTMLInputElement).value
    setValue(newValue)
    props.onChange && props.onChange(newValue)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onEnter && props.onEnter(value())
    }
  }

  const onFocus = (e: Event) => {
    if (selectOnFocus) {
      (e.target as HTMLInputElement).select()
    }
  }

  const StyledTextField = styled(BaseTextField)`
    width: ${width || '100%'};
  `

  const Container: typeof Row | typeof Column = props.inline ? Row : Column
  return (
    <Container alignItems="baseline" gap={props.inline ? '10px' : '5px'} class={props.class}>
      {props.label && (
        <Label text={props.label} subtext={props.sublabel} for={props.id} disabled={disabled} />
      )}
      <StyledTextField
        type="text"
        id={props.id}
        maxLength={maxLength}
        disabled={disabled}
        placeholder={props.placeholder}
        value={value()}
        onKeyDown={onKeyDown}
        onInput={onChange}
        onFocus={onFocus}
      />
    </Container>
  )
}

export default TextField
