import { createGlobalStyles, styled } from 'solid-styled-components'
import { JSX, createEffect, createSignal, on, onCleanup, onMount } from 'solid-js'
import Color from './Color'
import ThemeProps from './ThemeProps'
import LightTheme from './LightTheme'
import DarkTheme from './DarkTheme'
import { checkSystemDarkTheme } from '../utils/system'

const BaseStyle = createGlobalStyles`
:root {
  --font-family: 'Helvetica Neue', Arial, sans-serif;
  --font-size: 16px;
  --font-size-lg: 1.5rem;
  --font-size-md: 1rem;
  --font-size-sm: 0.75rem;

  --background-color: ${Color.light2};
  --background-color-hover: ${Color.light3};
  --background-color-disabled: ${Color.light4};

  --progress-border-radius: 0.3rem;
  --progress-width: 100%;
  --progress-height: 1.25rem;

  --card-width-full: 80%;
  --card-width-lg: 850px;
  --card-width-md: 400px;
  --card-width-sm: 250px;
  --card-height-full: 80%;
  --card-height-lg: 600px;
  --card-height-md: 500px;
  --card-height-sm: 250px;
  --card-justify-content-center: center;
  --card-justify-content-start: flex-start;
  --button-width: fit-content;
  --button-height: fit-content;
  --button-padding: 10px 20px;
  --button-margin: 0;
  --button-font-size: 1rem;
  --button-text-align: center;
  --button-border-width: 2px;
  --button-border-width-disabled-hover: 0;

  --toggle-button-border-width: 2px;
  --dot-button-border-width: 1px;
  --clip-button-width: 1.5rem;
  --clip-button-height: 1.5rem;
  --clip-button-border-radius: 0.25rem;
  --clip-button-border-width: 1px;
  --clip-button-padding: 0;

  --dialog-width: 320px;
  --dialog-header-font-size: 1.25rem;

  --menu-width, 150px;
  --menu-item-padding: 10px 20px;
  --menu-border-width: 2px;
  --menu-item-font-weight: 200;

  --spinner-size: 2rem;
  --spinner-thickness: 0.2rem;

  --navpanel-item-width: 5rem;
  --navpanel-item-height: content-fit;
  --navpanel-min-width: 64px;
  --navpanel-padding: 0;
  --navpanel-width: 120px;
  --navpanel-height: 100%;

  --popover-font-size: 0.875rem;
  --popover-width: 100px;
  --popover-min-width: 40px;
  --popover-max-width: 200px;

  --drawer-width: 240px;

  --elevation-ground-box-shadow: none;
  --elevation-ground-text-shadow: none;
  --elevation-ground-filter: none;
  --elevation-ground-scale: none;
  --elevation-moderate-translate: none;

  --elevation-moderate-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  --elevation-moderate-text-shadow: none;
  --elevation-moderate-filter: saturate(1.2);
  --elevation-moderate-scale: scale(1.05, 1.05);
  --elevation-moderate-translate: translate(2px, 2px);

  --elevation-high-box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
  --elevation-high-text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  --elevation-high-filter: saturate(1.5);
  --elevation-high-scale: scale(1.05, 1.05);

  --filters-none: none;
  --filters-disabled: grayscale(90%) saturate(10%);
  --filters-hover: saturate(120%);

  --text-margin : 0;
  --text-align : start;
  --text-line-height : 1.5;
  --text-letter-spacing : normal;
  --text-word-spacing : normal;
  --text-word-break : normal;
  --text-word-wrap : break-word;
  --text-transform : none;
  --text-decoration : none;
  --text-indent : 0;
  --text-shadow : none;
  --text-white-space : normal;

  margin: 0;
  padding: 0;
  line-height: 1.5;
  letter-spacing: normal;
  word-spacing: normal;
  word-break: normal;
  word-wrap: break-word;
  text-transform: none;
  text-decoration: none;  
  text-indent: 0;
  text-shadow: none;
  white-space: normal;
  width: 100%;
  height: 100%;
  overflow: visible;

  background: var(--color-white);
  font-family: var(--font-family);
  font-size: var(--font-size);

  /* overflow: hidden; */
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
h1 {
  font-size: 2.25rem; /* 36px / 16px = 2.25rem */
  line-height: 1.3;
  letter-spacing: 0.0625rem; /* 1px / 16px = 0.0625rem */
  word-spacing: 0.125rem; /* 2px / 16px = 0.125rem */
}

h2 {
  font-size: 1.875rem; /* 30px / 16px = 1.875rem */
  line-height: 1.3;
  letter-spacing: 0.046875rem; /* 0.75px / 16px = 0.046875rem */
  word-spacing: 0.09375rem; /* 1.5px / 16px = 0.09375rem */
}

h3 {
  font-size: 1.5rem; /* 24px / 16px = 1.5rem */
  line-height: 1.3;
  letter-spacing: 0.03125rem; /* 0.5px / 16px = 0.03125rem */
  word-spacing: 0.078125rem; /* 1.25px / 16px = 0.078125rem */
}

h4 {
  font-size: 1.25rem; /* 20px / 16px = 1.25rem */
  line-height: 1.3;
  letter-spacing: 0.015625rem; /* 0.25px / 16px = 0.015625rem */
  word-spacing: 0.0625rem; /* 1px / 16px = 0.0625rem */
}

h5 {
  font-size: 1rem; /* 16px / 16px = 1rem */
  line-height: 1.3;
  letter-spacing: 0.009375rem; /* 0.15px / 16px = 0.009375rem */
  word-spacing: 0.046875rem; /* 0.75px / 16px = 0.046875rem */
}

h6 {
  font-size: 0.75rem; /* 12px / 16px = 0.75rem */
  line-height: 1.3;
  letter-spacing: 0.00625rem; /* 0.1px / 16px = 0.00625rem */
  word-spacing: 0.03125rem; /* 0.5px / 16px = 0.03125rem */
}

p, ol, ul {
  line-height: 1.6; /* More line-height for elements with more text */
  letter-spacing: 0.005em;
  word-spacing: 0.1em;
  word-break: break-word;
  word-wrap: break-word;
}
a {
  text-decoration: none;
}
a:hover, a:focus {
  text-decoration: underline; /* Add underline to links on hover and focus for better accessibility */
}
pre, code {
  white-space: pre; /* Preserve white space for preformatted text and code blocks */
}
nav {
  white-space: nowrap; /* Prevent nav links from wrapping */
}
`

interface BaseStyleProps {
  children?: JSX.Element | JSX.Element[]
  theme?: ThemeProps | null
  dir?: string
}

const GlobalStyle = (props: BaseStyleProps) => {
  const [activeTheme, setActiveTheme] = createSignal<ThemeProps>(
    checkSystemDarkTheme() ? DarkTheme : LightTheme,
  )

  onMount(() => {
    /**
     * 1. Check if the user has set a theme preference.
     * 2. If the user has set a theme preference, use it.
     * 3. If the user has not set a theme preference, check if the system is in dark mode.
     */
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

    const updateTheme = () => {
      if (props.theme) {
        return
      }
      setActiveTheme(matchMedia.matches ? DarkTheme : LightTheme)
    }

    updateTheme()
    matchMedia.addEventListener('change', updateTheme)

    onCleanup(() => {
      matchMedia.removeEventListener('change', updateTheme)
    })
  })

  createEffect(() => {
    /**
     * Retrieve the active theme (ThemeProps) and
     * supersede the theme variables specified in :root.
     */
    const theme = activeTheme()
    const style = document.documentElement.style

    for (let key in theme) {
      const tk = key as keyof ThemeProps
      theme[tk] && style.setProperty(tk, theme[tk]!)
    }
  })

  createEffect(() => {
    setActiveTheme(props.theme || (checkSystemDarkTheme() ? DarkTheme : LightTheme))
  })

  createEffect(() => {
    document.body.dir = props.dir || 'ltr'
  })

  return <BaseStyle />
}

export default GlobalStyle
