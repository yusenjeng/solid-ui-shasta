import { Accessor, Setter, createContext } from 'solid-js';

interface RadioGroupContextProps {
  selected: Accessor<string>;
  setSelected: Setter<string>;
  disabled: Accessor<boolean>;
}

const RadioGroupContext = createContext<RadioGroupContextProps>();

export default RadioGroupContext;
