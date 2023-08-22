import { styled } from 'solid-styled-components'
import { Router, Route, Routes } from '@solidjs/router'
import { createSignal } from 'solid-js'
import InfiniteScrollDemo from './InfiniteScrollDemo'
import {
  DarkTheme,
  LightTheme,
  GlobalStyle,
  NavLink,
  NavPanel,
  Row,
  ThemeProps,
  Column,
  NavButton
} from '../src'

import Demo from './Demo'

const AppWrapper = styled('div')`
  width: 100%;
  height: 100%;
`

const App = () => {
  const [theme, setTheme] = createSignal<ThemeProps | null>(null)
  const onThemeChange = (theme: string) => {
    setTheme(theme === 'light' ? LightTheme : DarkTheme)
  }

  const [dir, setDir] = createSignal('ltr')
  const onDirChange = (direction: string) => {
    setDir(direction)
    console.log(dir())
  }
  //   <Row>
  //   <Dropdown defaultLabel="Theme" onChange={onThemeChange}>
  //     <DropdownOption label="Light" value="light" />
  //     <DropdownOption label="Dark" value="dark" />
  //   </Dropdown>
  //   <Dropdown defaultLabel="Dir" onChange={onDirChange}>
  //     <DropdownOption label="LTR" value="ltr" />
  //     <DropdownOption label="RTL" value="rtl" />
  //   </Dropdown>
  // </Row>

  return (
    <Row justifyContent="space-between" flexWrap="nowrap" width="100%" height="100%" gap="0">
      <GlobalStyle theme={theme()} dir={dir()} />
      <NavPanel height="100vh">
        <Column gap="0.5rem" margin="0.5rem 0 0 0">
          <NavLink href="/" text="Demo" icon="iconoir-home" />
          <NavLink href="/infinitescroll" text="Infinite Scroll" icon="iconoir-data-transfer-both" />
        </Column>
        <Column gap="1rem" margin="0 0 1rem 0">
          <NavButton icon="iconoir-shield-alert" />
          <NavButton icon="iconoir-cloud-download" />
        </Column>
      </NavPanel>
      <Router>
        <Routes>
          <Route path="/" component={Demo} />
          <Route path="/infinitescroll" component={InfiniteScrollDemo} />
        </Routes>
      </Router>
    </Row>
  )
}

export default App
