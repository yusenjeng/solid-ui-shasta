
/**
 * @returns A boolean indicating whether the system is in dark mode.
 */
export const checkSystemDarkTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

