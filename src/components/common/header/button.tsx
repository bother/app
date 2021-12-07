import React, { FunctionComponent } from 'react'
import { ActivityIndicator, Pressable } from 'react-native'

import { tw } from '../../../styles'
import { HeaderIconName } from '../../../types'
import { HeaderIcon } from './icon'

type Props = {
  icon: HeaderIconName
  loading?: boolean

  onPress: () => void
}

export const HeaderButton: FunctionComponent<Props> = ({
  icon,
  loading,
  onPress
}) => (
  <Pressable disabled={loading} onPress={onPress} style={tw`p-4`}>
    {loading ? (
      <ActivityIndicator color={tw.color('white')} />
    ) : (
      <HeaderIcon name={icon} />
    )}
  </Pressable>
)
