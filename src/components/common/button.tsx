import React, { FunctionComponent } from 'react'
import {
  ButtonProps,
  Pressable,
  StyleProp,
  Text,
  ViewStyle
} from 'react-native'

import { tw } from '../../styles'
import { Spinner } from './spinner'

type Props = Pick<ButtonProps, 'onPress' | 'title' | 'disabled'> & {
  loading?: boolean
  style?: StyleProp<ViewStyle>
}

export const Button: FunctionComponent<Props> = ({
  disabled,
  loading,
  onPress,
  style,
  title
}) => (
  <Pressable
    disabled={disabled || loading}
    onPress={onPress}
    style={[
      tw`flex-row items-center justify-center p-3 rounded-lg bg-primary-600`,
      style
    ]}>
    <Text style={tw`text-base leading-tight text-white font-bother-medium`}>
      {title}
    </Text>

    {loading && <Spinner color={tw.color('white')} style={tw`ml-2`} />}
  </Pressable>
)
