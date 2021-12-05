import React, { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import { tw } from '../../styles'

type Props = Pick<
  TextInputProps,
  | 'autoCapitalize'
  | 'autoCorrect'
  | 'autoFocus'
  | 'keyboardType'
  | 'onChangeText'
  | 'onSubmitEditing'
  | 'placeholder'
  | 'returnKeyType'
  | 'secureTextEntry'
  | 'style'
  | 'value'
>

export const TextBox = forwardRef<TextInput, Props>(
  ({ style, ...props }, ref) => (
    <TextInput
      ref={ref}
      {...props}
      placeholderTextColor={tw.color('gray-400')}
      style={[
        tw`p-3 text-base leading-tight text-black bg-gray-100 rounded-lg font-secret-regular`,
        style
      ]}
    />
  )
)
