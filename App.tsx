import 'react-native-url-polyfill/auto'
import 'react-native-gesture-handler'

import { Platform, UIManager } from 'react-native'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

import { Bother } from './src'

export default Bother
