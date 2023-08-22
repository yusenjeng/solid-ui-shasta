import { Accessor, Setter, createContext } from 'solid-js'

interface DropdownContextProps {
  selected: Accessor<string>
  setSelected: Setter<string>
  disabled: Accessor<boolean>
}

const DropdownContext = createContext<DropdownContextProps>()

export default DropdownContext
