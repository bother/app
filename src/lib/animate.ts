import {
  LayoutAnimation,
  LayoutAnimationConfig,
  Platform,
  UIManager
} from 'react-native'

export const setupAnimation = (): void => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }
}

export const animate = (
  preset: LayoutAnimationConfig = LayoutAnimation.Presets.easeInEaseOut
): void => LayoutAnimation.configureNext(preset)
