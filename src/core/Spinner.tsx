import { createEffect, createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'

interface SpinnerProps {
  children?: never
  size?: string
  thickness?: string
  ring?: 'quarter' | 'half' | 'majority' | boolean
}

const Spinner = (props: SpinnerProps) => {
  const { ring } = props
  const colorBorderLeft = (ring === 'half') || (ring === 'majority') ? 'var(--spinner-border-color-strong)' : 'var(--spinner-border-color-weak)' 
  const colorBorderBottom = (ring === 'majority')? 'var(--spinner-border-color-strong)' : 'var(--spinner-border-color-weak)' 

  const SpinAnimation = styled('div')`
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    border: var(--spinner-thickness) solid var(--spinner-border-color-weak);
    border-top: var(--spinner-thickness) solid var(--spinner-border-color-strong);
    border-left: var(--spinner-thickness) solid ${colorBorderLeft};
    border-bottom: var(--spinner-thickness) solid ${colorBorderBottom};
    border-right: var(--spinner-thickness) solid var(--spinner-border-color-weak);
    border-radius: 50%; 
    animation: spin 1s linear infinite;
    width: ${props.size ? props.size : 'var(--spinner-size)'};
    height: ${props.size ? props.size : 'var(--spinner-size)'};
    border-width: ${props.thickness ? props.thickness : 'var(--spinner-thickness)'};
  `

  return <SpinAnimation class='spinner' />
}

export default Spinner
