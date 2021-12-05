import React, { FunctionComponent } from 'react'
import { View } from 'react-native'

import { tw } from '../../styles'

export const Separator: FunctionComponent = () => (
  <View style={tw`h-px bg-gray-200`} />
)
