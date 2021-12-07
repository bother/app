import React, { FunctionComponent } from 'react'
import { Pressable } from 'react-native'

import { tw } from '../../../styles'
import { HeaderIconName } from '../../../types'
import { Spinner } from '../spinner'
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
      <Spinner color={tw.color('white')} />
    ) : (
      <HeaderIcon name={icon} />
    )}
  </Pressable>
)
