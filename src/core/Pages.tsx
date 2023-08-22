import { createEffect, createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'

const PrimitiveIcon = styled('div')`
  width: 300px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  p {
    font-size: 1em;
  }
`

interface PrimitiveIconProps {
  children?: any
}

interface IconProps extends PrimitiveIconProps {
}

const Icon = (props: IconProps) => {

  return (
    <PrimitiveIcon/>
  )
}

export default Icon
