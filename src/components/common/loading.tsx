import React, { FunctionComponent } from 'react'
import { View } from 'react-native'

import { tw } from '../../styles'
import { Spinner } from './spinner'

export const Loading: FunctionComponent = () => (
  <View style={tw`items-center justify-center flex-1`}>
    <Spinner size="large" />
  </View>
)
