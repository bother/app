import React, { FunctionComponent } from 'react'
import { Pressable, StyleProp, ViewStyle } from 'react-native'

import { tw } from '../../../styles'
import { HeaderIconName } from '../../../types'
import { Spinner } from '../spinner'
import { HeaderIcon } from './icon'

type Props = {
  icon: HeaderIconName
  loading?: boolean
  style?: StyleProp<ViewStyle>

  onPress: () => void
}

export const HeaderButton: FunctionComponent<Props> = ({
  icon,
  loading,
  onPress,
  style
}) => (
  <Pressable disabled={loading} onPress={onPress} style={[tw`p-4`, style]}>
    {loading ? (
      <Spinner color={tw.color('white')} />
    ) : (
      <HeaderIcon name={icon} />
    )}
  </Pressable>
)
