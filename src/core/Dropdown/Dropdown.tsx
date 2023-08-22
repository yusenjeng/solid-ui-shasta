import { JSX, createEffect, createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'
import DropdownContext from './DropdownContext'
import DropdownOption from './DropdownOption'

const BaseDropdown = styled('select')<{ style?: string }>`
  appearance: none;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  background-color: var(--background-color);
  text-align: center;
  padding: 10px;
  transition: border-color 0.3s;
  outline: none;
  cursor: pointer;
  &:focus {
    border-color: var(--color-primary);
  }
  ${props => props.style}
`

interface DropdownProps {
  children: JSX.Element | JSX.Element[]
  defaultLabel: string
  disabled?: boolean
  class?: string
  style?: string
  onChange?: (selectedOption: string) => void
}

function Dropdown(props: DropdownProps) {
  const [selected, setSelected] = createSignal('')
  const [disabled] = createSignal(props.disabled || false)

  createEffect(() => {
    if (selected() === '') {
      return
    }
    props.onChange && props.onChange(selected())
  })

  return (
    <DropdownContext.Provider value={{ selected, setSelected, disabled }}>
      <BaseDropdown
        value={selected()}
        onChange={(e: Event) => setSelected((e.target as HTMLSelectElement).value)}
        class={props.class}
        style={props.style}
        disabled={disabled()}
      >
        <DropdownOption label={props.defaultLabel} value="" selected disabled hidden />

        {props.children}
      </BaseDropdown>
    </DropdownContext.Provider>
  )
}

export default Dropdown
