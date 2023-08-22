import { styled } from 'solid-styled-components'

interface RowProps {
  children?: any
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  gap?: string
  class?: string
  ref?: (el: HTMLDivElement) => void
  width?: string
  height?: string
  flexWrap ?: 'wrap' | 'nowrap' | 'wrap-reverse'
}

const BaseRow = styled('div')<RowProps>`
  display: flex;
  flex-wrap: ${props => (props.flexWrap ? props.flexWrap : 'wrap')};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  gap: 10px;
  height: 30px;
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  padding: 0;
  color: var(--color-primary);
  width: ${props => (props.width ? props.width : 'fit-content')};
  height: ${props => (props.height ? props.height : 'fit-content')};
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'flex-start')};
  gap: ${props => (props.gap ? props.gap : '10px')};

  .divider {
    width: 1px;
    margin: 0 10px;
    height: 90%;
  }
`

const Row = (props: RowProps) => {
  return (
    <BaseRow
      class={props.class}
      ref={props.ref}
      width={props.width}
      height={props.height}
      alignItems={props.alignItems}
      justifyContent={props.justifyContent}
      flexWrap={props.flexWrap}
      gap={props.gap}
    >
      {props.children}
    </BaseRow>
  )
}

export default Row
