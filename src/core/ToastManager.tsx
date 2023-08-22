import { createSignal, For, onCleanup, onMount } from 'solid-js'
import { styled } from 'solid-styled-components'

enum ToastType {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}

interface ToastData {
  id: number
  message: string
  duration?: number
  type: ToastType
}

interface ToastProps {
  key: string
  message: string
  duration?: number
  type: ToastType
}

type ToastFunc = (message: string, type: ToastType, duration?: number) => void

interface ToastManagerProps {
  toast: (toast: ToastFunc) => void
}

const getToastColor = (type: ToastType) => {
  switch (type) {
    case ToastType.PRIMARY:
      return 'var(--toast-color-primary)'
    case ToastType.WARNING:
      return 'var(--toast-color-warning)'
    case ToastType.SUCCESS:
      return 'var(--toast-color-success)'
    case ToastType.DANGER:
      return 'var(--toast-color-danger)'
    default:
      return 'var(--toast-color-primary)'
  }
}

const ToastMessage = styled('div')<{ type: ToastType; visible: boolean }>`
  @keyframes slideIn {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  border: 2px solid;
  border-color: ${props => getToastColor(props.type)};
  color: var(--toast-text-color);
  background-color: ${props => getToastColor(props.type)};
  padding: 16px;
  margin-top: 10px;
  max-width: 300px;
  text-align: center;
  font-size: 1rem;
  text-shadow: var(--toast-text-shadow);
  box-shadow: var(--toast-box-shadow);
  filter: opacity(0.9);
  animation: ${props => (props.visible ? 'slideIn' : 'fadeOut')} 0.3s ease;
  transition: transform 0.3s ease, opacity 0.3s ease;
`
const ToastContainer = styled('div')<{ key?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

const ToastStack = styled('div')`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  z-index: 9999;
`

const Toast = (props: ToastProps) => {
  const [visible, setVisible] = createSignal(false)

  onMount(() => {
    setVisible(true)
    const timeoutId = setTimeout(() => setVisible(false), props.duration || 3000)
    onCleanup(() => clearTimeout(timeoutId))
  })

  return (
    <ToastContainer key={props.key}>
      {visible() && (
        <ToastMessage type={props.type} visible={visible()}>
          {props.message}
        </ToastMessage>
      )}
    </ToastContainer>
  )
}

const ToastManager = (props: ToastManagerProps) => {
  const [toasts, setToasts] = createSignal<ToastData[]>([])
  let idCounter = 0

  const addToast = (message: string, type: ToastType, duration: number = 3000) => {
    const id = ++idCounter
    const newToast: ToastData = { id, message, duration, type }

    // add the toast to the list
    setToasts([...toasts(), newToast])

    // remove the toast after duration
    setTimeout(() => removeToast(id), newToast.duration)
  }

  const removeToast = (id: number) => {
    setToasts(toasts().filter(toast => toast.id !== id))
  }

  // Call the addToast prop with the addToast function
  props.toast(addToast)

  return (
    <ToastStack>
      <For each={toasts()}>
        {toast => (
          <Toast
            key={`${toast.id}`}
            type={toast.type}
            message={toast.message}
            duration={toast.duration}
          />
        )}
      </For>
    </ToastStack>
  )
}

export { ToastManager, ToastType }
export type { ToastFunc }
