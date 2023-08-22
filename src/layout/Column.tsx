import { styled } from 'solid-styled-components'

interface ColumnProps {
  children?: any
  alignItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  gap?: string
  class?: string
  width?: string
  height?: string
  justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around'
  margin?: string
}

const BaseColumn = styled('div')<ColumnProps>`
  display: flex !important;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  gap: 10px;
  margin: 0 auto;
  color: var(--color-primary);
  
  .divider {
    height: 1px;
    margin: 10px 0;
    width: 90%;
  }
`

const Column = (props: ColumnProps) => {
  const StyledColumn = styled(BaseColumn)`
    align-items: ${props.alignItems ? props.alignItems : 'center'};
    gap: ${props.gap ? props.gap : '10px'};
    width: ${props.width ? props.width : 'auto'};
    height: ${props.height ? props.height : 'auto'};
    justify-content: ${props.justifyContent ? props.justifyContent : 'flex-start'};
    margin: ${props.margin ? props.margin : '0 auto'};
  `

  return <StyledColumn class={props.class}>{props.children}</StyledColumn>
}

export default Column
