import { JSX } from 'solid-js'
import { styled } from 'solid-styled-components'
import {Button, DotButton} from '../Button'
import {TopRight, Row} from '../../layout'
import {Text} from '../'
import { DialogProps } from './props'

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

const Dialog = (props: DialogProps) => {

  const onClose = props.onClose || (() => {})
  const onConfirm = props.onConfirm ? props.onConfirm : onClose

  return (
    <>
      <Backdrop onClick={() => onClose()} />
      <DialogWrapper width={props.width}>
        {props.title && (
          <Row justifyContent={props.align || 'center'}>
            <Text weight='700' size='var(--dialog-header-font-size)'>{props.title}</Text>
          </Row>
        )}
        {props.showCloseButton && (
          <TopRight padding="var(--dialog-header-font-size)">
            <DotButton
              icon="iconoir-cancel"
              onClick={() => onClose()}
            />
          </TopRight>
        )}
        <Body>{props.children}</Body>
        <Footer>
          <Row>
            {props.showCancelButton && <Button onClick={() => onClose()}>Cancel</Button>}
            {props.showConfirmButton && (
              <Button onClick={()=> onConfirm()}>
                Confirm
              </Button>
            )}
          </Row>
        </Footer>
      </DialogWrapper>
    </>
  )
}

export default Dialog
