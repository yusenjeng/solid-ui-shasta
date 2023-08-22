import { createMemo } from 'solid-js'
import { styled } from 'solid-styled-components'

type Size = 'lg' | 'md' | 'sm' | string | undefined
type Weight =
  | 'bold'
  | 'normal'
  | 'lighter'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | string
type Align = 'start' | 'end' | 'center' | 'justify'
type Transform = 'uppercase' | 'lowercase' | 'capitalize' | 'none'
type Decoration = 'none' | 'underline' | 'wavy' | 'line-through'

interface TextProps {
  children?: any
  size?: Size
  family?: string
  weight?: Weight
  align?: Align
  color?: string
  bgColor?: string
  lineHeight?: string
  letterSpacing?: string
  wordSpacing?: string
  wordBreak?: string
  wordWrap?: string
  transform?: Transform
  decoration?: Decoration
  textIndent?: string
  textShadow?: string
  whiteSpace?: string
  margin?: string
  disabled?: boolean
  display?: string
  style?: string
}

const BaseText = styled('div')<TextProps>`
  display: ${props => props.display};
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  font-family: ${props => props.family};
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  text-align: ${props => props.align};
  line-height: ${props => props.lineHeight};
  letter-spacing: ${props => props.letterSpacing};
  word-spacing: ${props => props.wordSpacing};
  word-break: ${props => props.wordBreak};
  word-wrap: ${props => props.wordWrap};
  text-transform: ${props => props.transform};
  text-decoration: ${props => props.decoration};
  text-indent: ${props => props.textIndent};
  text-shadow: ${props => props.textShadow};
  white-space: ${props => props.whiteSpace};
  margin: ${props => props.margin};

  ${props => props.style}
`

const Text = (props: TextProps) => {
  const sizeEM = createMemo(() => {
    const sizeMap: Record<string, string> = {
      lg: 'var(--font-size-lg)',
      md: 'var(--font-size-md)',
      sm: 'var(--font-size-sm)',
    }

    return props.size ? sizeMap[props.size] || props.size : 'var(--font-size-md)'
  })()

  return (
    <BaseText
      size={sizeEM}
      color={props.disabled ? 'var(--color-disabled)' : props.color ?? `var(--color-primary)`}
      bgColor={props.bgColor ?? 'transparent'}
      family={props.family ?? 'var(--font-family)'}
      weight={(props.weight ?? '400') as Weight}
      align={(props.align ?? 'var(--text-align)') as Align}
      lineHeight={props.lineHeight ?? 'var(--text-line-height)'}
      letterSpacing={props.letterSpacing ?? 'var(--text-letter-spacing)'}
      wordSpacing={props.wordSpacing ?? 'var(--text-word-spacing)'}
      wordBreak={props.wordBreak ?? 'var(--text-word-break)'}
      wordWrap={props.wordWrap ?? 'var(--text-word-wrap)'}
      transform={(props.transform ?? 'var(--text-transform)') as Transform}
      decoration={(props.decoration ?? 'var(--text-decoration)') as Decoration}
      textIndent={props.textIndent ?? 'var(--text-indent)'}
      textShadow={props.textShadow ?? 'var(--text-shadow)'}
      whiteSpace={props.whiteSpace ?? 'var(--text-white-space)'}
      margin={props.margin ?? 'var(--text-margin)'}
      display={props.display ?? 'block'}
      style={props.style}
    >
      {props.children}
    </BaseText>
  )
}

export default Text
