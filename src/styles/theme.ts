import { Theme } from '@react-navigation/native'

import { tw } from './tailwind'

export const navTheme: Theme = {
  colors: {
    background: tw.color('white')!,
    border: tw.color('gray-200')!,
    card: tw.color('primary-600')!,
    notification: tw.color('primary-600')!,
    primary: tw.color('white')!,
    text: tw.color('white')!
  },
  dark: false
}
