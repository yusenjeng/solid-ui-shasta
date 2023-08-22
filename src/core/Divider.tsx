import { styled } from 'solid-styled-components'



const BaseDivider = styled('div')<{bgColor?:string, height?:string, width?:string, padding?:string, margin?:string}>`
  border: none;
  background-color: ${props => props.bgColor};
  height: ${props => props.height};
  width: ${props => props.width};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`

interface DividerProps {
  children?: never
  height?: string
  width?: string
  color?: string
  margin?: string
  padding?: string
}

const Divider = (props: DividerProps) => {
  return (
    <BaseDivider
      class="divider"
      width={props.width ? props.width + '!important' : 'auto'}
      height={props.height ? props.height + '!important' : 'auto'}
      bgColor={props.color ? props.color + '!important' : 'var(--divider-color)'}
      margin={props.margin ? props.margin + '!important' : 'initial'}
      padding={props.padding ? props.padding + '!important' : 'initial'}
    />
  )
}

export default Divider
