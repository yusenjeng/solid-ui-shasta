import { styled } from 'solid-styled-components'

const TopLeft = styled('div')<{ padding?: string }>`
  position: absolute;
  top: ${props => props.padding || 0};
  bottom: auto;
  left: ${props => props.padding || 0};
  right: auto;
  transform: translate(0);
`

export default TopLeft
