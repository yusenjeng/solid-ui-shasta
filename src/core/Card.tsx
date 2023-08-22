import { styled } from 'solid-styled-components'
import { JSX } from 'solid-js/jsx-runtime'
import { createMemo } from 'solid-js'

const baseStyles = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding: 0.4rem 1rem;
  border-radius: 4px;
`

interface ThemeCardProps {
  width?: string
  height?: string
  gap?: string
  justifyContent?: string
}
const ThemeCard = styled('div')<ThemeCardProps>`
  ${baseStyles}
  border: 1px solid var(--card-color);
  background-color: var(--card-bg-color);
  box-shadow: var(--elevation-ground-box-shadow);
  width: ${props => props.width};
  height: ${props => props.height};
  gap: ${props => props.gap};
  justify-content: ${props => props.justifyContent};
  transition: 0.3s ease;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--card-color);
  }
  &:hover {
    /* box-shadow: var(--elevation-moderate-box-shadow); */
  }
`

interface CardProps {
  title?: string
  children?: JSX.Element
  size?: string
  gap?: string
  justifyContent?: string
}

const Card = (props: CardProps) => {
  const { title, size, children, gap, justifyContent } = props

  const widthTable: Record<string, string> = {
    full: 'var(--card-width-full)',
    lg: 'var(--card-width-lg)',
    md: 'var(--card-width-md)',
    sm: 'var(--card-width-sm)',
  }
  const heightTable: Record<string, string> = {
    full: 'var(--card-height-full)',
    lg: 'var(--card-height-lg)',
    md: 'var(--card-height-md)',
    sm: 'var(--card-height-sm)',
  }

  const widthInCSS = (size: string | undefined) => {
    return size ? widthTable[size] || size : 'var(--card-width-md)'
  }
  const heightInCSS = (size: string | undefined) => {
    return size ? heightTable[size] || size : 'var(--card-height-md)'
  }
  const calculatedProps = createMemo(() => ({
    width: widthInCSS(size),
    height: heightInCSS(size),
    gap: gap || '0',
    justifyContent: justifyContent || 'var(--card-justify-content-start)',
  }))()

  return (
    <ThemeCard {...calculatedProps}>
      <h3>{title}</h3>
      {children}
    </ThemeCard>
  )
}

export default Card
