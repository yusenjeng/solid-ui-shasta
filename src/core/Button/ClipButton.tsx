import { Show, createEffect, createSignal } from 'solid-js'
import IconButton from './IconButton'
import { styled } from 'solid-styled-components'

const BaseClipButton = styled(IconButton)<{ isCopied: boolean }>`
  width: var(--clip-button-width) !important;
  height: var(--clip-button-height) !important;
  min-width: var(--clip-button-width) !important;
  min-height: var(--clip-button-height) !important;
  border: ${props => props.isCopied ? '0': 'var(--clip-button-border-width)'} solid var(--button-border-color) !important;
  border-radius: var(--clip-button-border-radius) !important;
  padding: var(--clip-button-padding) !important;
  background-color: ${props =>
    props.isCopied ? 'var(--clip-button-bg-color-copied)' : 'var(--button-bg-color)'};
`

interface ClipButton {
  text: string
  onCopy?: (text?: string) => void
}
const ClipButton = (props: ClipButton) => {
  const [isCopied, setCopied] = createSignal(false)
  const [icon, setIcon] = createSignal('iconoir-copy')

  const onCopyClick = () => {
    navigator.clipboard
      .writeText(props.text)
      .then(() => {
        setCopied(true)
        setIcon('iconoir-check')
        props.onCopy && props.onCopy(props.text)
      })
      .catch(err => console.error('Could not copy text: ', err))
  }

  return (
    <BaseClipButton
      icon={icon()}
      iconColor={isCopied() ? 'var(--color-white)' : 'var(--button-color)'}
      isCopied={isCopied()}
      noBorder={isCopied()}
      onClick={onCopyClick}
    />
  )
}

export default ClipButton
