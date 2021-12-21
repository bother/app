import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { Logo } from '../components'
import { MainParamList } from '../navigators'
import { tw } from '../styles'

type Props = BottomTabScreenProps<MainParamList, 'Profile'>

export const Empty: FunctionComponent<Props> = () => (
  <View style={tw`items-center justify-center flex-1`}>
    <Logo />
    <Text style={tw`mt-8 text-4xl text-black font-bother-bold`}>Bother</Text>
    <Text style={tw`text-lg text-gray-600 font-bother-medium`}>
      What bothers you?
    </Text>
  </View>
)
