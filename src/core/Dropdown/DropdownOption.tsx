import { useContext } from 'solid-js'
import { styled } from 'solid-styled-components'
import DropdownContext from './DropdownContext'

const BaseDropdownOption = styled('option')<{ key: string | undefined }>`
  /* color: #333;
  background-color: #fff;
  padding: 5px 10px;
  font-size: 1em;
  text-align: center;
  &:hover {
    background-color: #f5f5f5;
  } */
`

interface DropdownOptionProps {
  value: string
  label: string
  selected?: boolean
  disabled?: boolean
  hidden?: boolean
  key?: string
}

function DropdownOption(props: DropdownOptionProps) {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('DropdownOption must be used within a Dropdown')
  }
  const { setSelected } = context

  return (
    <BaseDropdownOption
      key={props.key}
      value={props.value}
      selected={props.selected}
      disabled={props.disabled}
      hidden={props.hidden}
      onClick={() => setSelected(props.value)}
    >
      {props.label}
    </BaseDropdownOption>
  )
}

export default DropdownOption
