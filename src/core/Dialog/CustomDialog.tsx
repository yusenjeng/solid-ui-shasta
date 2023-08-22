import { JSX } from 'solid-js'
import { styled } from 'solid-styled-components'
import {Row, TopRight} from '../../layout/'
import {Button, IconButton} from '../Button'
import { CustomDialogProps, DialogProps } from './props'

const Backdrop = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--backdrop-color);
  z-index: 9998;
`

const DialogWrapper = styled('div')<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || 'var(--dialog-width)'};
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--dialog-bg-color);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`

const Body = styled('div')`
  padding: 1rem 0.625rem;
  color: var(--color-primary);
`

const Footer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`

const CustomDialog = (props: CustomDialogProps) => {

  const onClose = props.onClose || (() => {})

  return (
    <>
      <Backdrop onClick={() => onClose()} />
      <DialogWrapper width={props.width}>
        {props.header}
        <Body>{props.children}</Body>
        {props.footer}
      </DialogWrapper>
    </>
  )
}

export default CustomDialog
