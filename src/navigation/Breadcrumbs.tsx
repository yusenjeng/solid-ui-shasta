import { For, Match, Switch, createEffect, createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'
import { Link } from '@solidjs/router'
import { Icon, Text } from '../core'
import { Row } from '../layout'

const BreadCrumbLink = styled(Link)`
  color: var(--breadcrumb-link-color);
  font-weight: var(--breadcrumb-link-font-weight);
  text-decoration: none;
  transition: all 0.2s ease;
  border-bottom: var(--breadcrumb-link-border-bottom-size) solid transparent;
  &:hover {
    text-decoration: none;
    border-bottom: var(--breadcrumb-link-border-bottom-size) solid var(--breadcrumb-link-color);
  }
  &:active {
    text-decoration: none;
  }
  &:visited {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`

type BreadcrumbsProps = {
  path: string
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const [pathParts, setPathParts] = createSignal<string[]>([])

  createEffect(() => {
    const parts = props.path.split('/').filter(Boolean)
    setPathParts(parts)
  })

  return (
    <Row gap="0.5rem">
      <For each={pathParts()}>
        {(part, i) => {
          const href = `/${pathParts()
            .slice(0, i() + 1)
            .join('/')}`
          const isLast = i() === pathParts().length - 1
          const isFirst = i() === 0

          return (
            <Switch
              fallback={
                <>
                  <Icon icon="iconoir-nav-arrow-right" />
                  <BreadCrumbLink href={href}>{part}</BreadCrumbLink>
                </>
              }
            >
              <Match when={isLast}>
                <Icon icon="iconoir-nav-arrow-right" />
                <Text weight="var(--breadcrumb-link-font-weight-bold)">{part}</Text>
              </Match>
              <Match when={isFirst}>
                <Icon icon="iconoir-home" />
                <BreadCrumbLink href={href}>{part}</BreadCrumbLink>
              </Match>
            </Switch>
          )
        }}
      </For>
    </Row>
  )
}

export default Breadcrumbs
