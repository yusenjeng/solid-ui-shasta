import Color from './Color'
import ThemeProps from './ThemeProps'

const DarkTheme: ThemeProps = {
  name: 'dark',
  '--font-family': 'Poppins, Helvetica Neue, Arial, sans-serif',
  '--font-size': '16px',
  '--font-size-lg': '1.5rem',
  '--font-size-md': '1rem',
  '--font-size-sm': '0.75rem',
  '--background-color': Color.dark1,
  '--background-color-selected': Color.dark5,
  '--background-color-hover': Color.dark3,
  '--background-color-disabled': Color.dark4,
  '--color-primary': Color.light2,
  '--color-success': Color.green2,
  '--color-warning': Color.gold2,
  '--color-danger': Color.pink1,
  '--color-disabled': Color.gray3,
  '--color-light-1': Color.light1,
  '--color-light-2': Color.light2,
  '--color-light-3': Color.light3,
  '--color-light-4': Color.light4,
  '--color-light-5': Color.light5,
  '--color-dark-1': Color.dark1,
  '--color-dark-2': Color.dark2,
  '--color-dark-3': Color.dark3,
  '--color-dark-4': Color.dark4,
  '--color-dark-5': Color.dark5,
  '--color-gold-1': Color.gold1,
  '--color-gold-2': Color.gold2,
  '--color-gold-3': Color.gold3,
  '--color-gold-4': Color.gold4,
  '--color-gold-5': Color.gold5,
  '--color-gray-1': Color.gray1,
  '--color-gray-2': Color.gray2,
  '--color-gray-3': Color.gray3,
  '--color-gray-4': Color.gray4,
  '--color-gray-5': Color.gray5,
  '--color-green-1': Color.green1,
  '--color-green-2': Color.green2,
  '--color-green-3': Color.green3,
  '--color-green-4': Color.green4,
  '--color-green-5': Color.green5,
  '--color-white': Color.white,

  '--progress-bg-color': Color.light1,
  '--progress-color': Color.gold1,
  '--card-color': Color.gray5,
  '--card-bg-color': Color.dark1,
  '--button-bg-color-hover': Color.dark2,
  '--button-bg-color-active': Color.dark3,
  '--button-color': Color.gray5,
  '--button-bg-color': Color.dark2,
  '--button-border-color': Color.gray4,
  '--button-border-color-hover': Color.gray4,

  '--toggle-button-bg-active': Color.dark4,
  '--toggle-button-border-color-active': Color.transparent,
  '--clip-button-bg-color-copied': Color.green2,

  '--dialog-bg-color': Color.dark1,
  '--backdrop-color': 'rgba(0, 0, 0, 0.5)',
  '--divider-color': 'var(--color-primary)',

  '--text-color': 'var(--color-primary)',
  '--text-color-selected': 'var(--color-light-1)',

  '--breadcrumb-link-color': 'var(--color-primary)',
  '--breadcrumb-link-font-weight': '200',
  '--breadcrumb-link-font-weight-bold': '700',
  '--breadcrumb-link-border-bottom-size': '1px',

  '--pagination-selected-text-color': 'var(--text-color-selected)',
  '--pagination-selected-bg-color': 'var(--background-color-selected)',

  '--toast-color-primary': 'var(--color-dark-3)',
  '--toast-color-success': 'var(--color-success)',
  '--toast-color-warning': 'var(--color-warning)',
  '--toast-color-danger': 'var(--color-danger)',
  '--toast-text-color': 'var(--color-light-1)',
  '--toast-text-shadow': '0px 0px 1px rgba(255,255,255, 1)',
  '--toast-box-shadow': 'none',

  '--menu-background-color': 'var(--color-dark-2)',
  '--menu-border-color': 'var(--color-primary)',
  '--menu-box-shadow': 'var(--elevation-moderate-box-shadow)',
  '--menu-item-bg-color-hover': 'var(--color-dark-3)',

  '--spinner-border-color-strong': 'rgba(255,255,255, 0.5)',
  '--spinner-border-color-weak': 'rgba(255,255,255, 0.1)',

  '--navpanel-background-color': 'var(--background-color)',
  '--navpanel-item-color': 'var(--color-primary)',
  '--navpanel-item-bg-color-hover': 'var(--background-color-hover)',
  '--navpanel-item-bg-color-active': 'var(--background-color-hover)',
  '--navpanel-item-border-color-active': 'var(--color-primary)',

  '--popover-color': 'var(--color-white)',
  '--popover-background-color': 'var(--color-gray-1)',

  '--tooltip-color': 'var(--color-white)',
  '--tooltip-background-color': 'var(--color-gray-1)',

  '--drawer-bg-color': 'var(--color-dark-2)',
  '--drawer-border-color': 'var(--color-primary)',
  '--drawer-handler-bg-color': 'var(--color-dark-4)',
  '--drawer-handler-bg-color-hover': 'var(--color-dark-5)',

  '--elevation-moderate-box-shadow': '2px 2px 8px rgba(255,255,255, 0.2)',
  '--elevation-high-box-shadow': '2px 2px 12px rgba(255,255,255, 0.2)',
  '--elevation-high-text-shadow': '2px 2px 4px rgba(255,255,255, 0.2)',
}

export default DarkTheme