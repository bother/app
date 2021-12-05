import React, { FunctionComponent } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'

import { tw } from '../../styles'

type Props = {
  message: string
  type?: 'message' | 'error' | 'warning' | 'success'
  style?: StyleProp<ViewStyle>
}

export const Message: FunctionComponent<Props> = ({
  message,
  style,
  type = 'message'
}) => (
  <View
    style={[
      tw.style(
        'rounded-lg p-3',
        type === 'error'
          ? 'bg-rose-600'
          : type === 'success'
          ? 'bg-emerald-600'
          : type === 'warning'
          ? 'bg-amber-600'
          : 'bg-sky-600'
      ),
      style
    ]}>
    <Text style={tw`text-base text-white font-secret-regular`}>{message}</Text>
  </View>
)
