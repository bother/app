import React, { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import { tw } from '../../styles'

type Props = Pick<
  TextInputProps,
  | 'autoCapitalize'
  | 'autoCorrect'
  | 'autoFocus'
  | 'keyboardType'
  | 'multiline'
  | 'onChangeText'
  | 'onSubmitEditing'
  | 'placeholder'
  | 'returnKeyType'
  | 'secureTextEntry'
  | 'style'
  | 'value'
>

export const TextBox = forwardRef<TextInput, Props>(
  ({ multiline, style, ...props }, ref) => (
    <TextInput
      {...props}
      multiline={multiline}
      placeholderTextColor={tw.color('gray-400')}
      ref={ref}
      style={[
        tw`p-3 text-base leading-tight text-black bg-gray-100 rounded-lg font-bother-regular`,
        style
      ]}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  )
)
