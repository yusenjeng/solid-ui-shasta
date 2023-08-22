import { JSX } from "solid-js/jsx-runtime"

export interface DialogProps {
  title?: string
  align?: 'flex-start' | 'center' | 'flex-end'
  width?: string
  showCloseButton?: boolean
  showConfirmButton?: boolean
  showCancelButton?: boolean
  children?: JSX.Element | JSX.Element[]
  onClose?: () => void
  onConfirm?: (data?: any) => void
  onCancel?: () => void
}

export interface CustomDialogProps extends DialogProps {
  header?: JSX.Element | JSX.Element[]
  footer?: JSX.Element | JSX.Element[]
}
