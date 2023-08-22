import { styled } from 'solid-styled-components'
import { JSX } from 'solid-js/jsx-runtime'
import { Row } from '../../layout'
import { createEffect, createSignal } from 'solid-js'

const BaseButton = styled('button')<{ style?: string; key?: string; noBorder?: boolean }>`
  display: inline-block;
  font-size: var(--button-font-size);
  text-align: var(--button-text-align);
  padding: var(--button-padding);
  transition: 0.3s ease, border 0.05s;
  cursor: pointer;
  min-width: 64px;
  min-height: 36px;

  color: var(--button-color);
  background-color: var(--button-bg-color);
  border: ${props =>
    props.noBorder ? '0' : 'var(--button-border-width) solid var(--button-border-color)'};
  width: var(--button-width);
  height: var(--button-height);

  box-shadow: var(--elevation-ground-box-shadow);
  filter: var(--filters-none);
  transform: var(--elevation-ground-scale);

  &:hover {
    border: ${props =>
      props.noBorder ? '0' : 'var(--button-border-width) solid var(--button-border-color-hover)'};

    background-color: var(--button-bg-color-hover);
  }
  &:active {
    background-color: var(--button-bg-color-active);
    i {
      transform: scale(0.95);
    }
  }
  &:disabled {
    color: var(--color-disabled);
    background-color: var(--background-color-disabled);
    filter: var(--filters-disabled);
    transform: none;
    cursor: not-allowed;
    border: 0;

    &:hover {
      border: 0;
      box-shadow: none;
    }
    &:active {
      background-color: var(--background-color-disabled);
      i {
        transform: none;
      }
    }
    div {
      color: var(--color-disabled);
      filter: var(--filters-disabled);
    }
    svg {
      stroke: var(--color-disabled);
      filter: var(--filters-disabled);
    }
  }

  ${props => props.style}
`

interface ButtonProps {
  children?: JSX.Element | JSX.Element[]
  onClick?: (event: MouseEvent) => void
  ref?: (el: HTMLButtonElement) => void
  disabled?: boolean
  key?: string
  text?: string
  gap?: string
  circle?: boolean
  width?: string
  height?: string
  noBorder?: boolean
  class?: string
  style?: string
}

const Button = (props: ButtonProps) => {
  const [propStyles, setPropStyles] = createSignal<string>()

  createEffect(() => {
    const w = props.width || 'var(--button-width)'
    const h = (props.circle && props.width) || props.height || 'var(--button-height)'
    const styles = `
      width: ${w};
      min-width: ${w};
      height: ${h};
      min-height: ${h};
      border-radius: ${props.circle ? '50%' : '0'};
      padding: ${props.circle ? '0' : 'var(--button-padding)'};
    `
    setPropStyles(styles)
  })

  return (
    <BaseButton
      ref={props.ref}
      onClick={props.onClick}
      disabled={props.disabled}
      noBorder={props.noBorder}
      class={props.class}
      style={props.style || propStyles()}
      key={props.key}
    >
      <Row gap={props.gap} justifyContent="center">
        {props.children ?? props.text}
      </Row>
    </BaseButton>
  )
}

export default Button
