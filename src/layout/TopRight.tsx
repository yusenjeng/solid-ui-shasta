import { styled } from 'solid-styled-components'

const TopRight = styled('div')<{ padding?: string }>`
  position: absolute;
  top: ${props => props.padding || 0};
  bottom: auto;
  left: auto;
  right: ${props => props.padding || 0};
  transform: translate(0);
`

export default TopRight
