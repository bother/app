import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FunctionComponent } from 'react'
import { Image, Text, View } from 'react-native'

import { MainParamList } from '../navigators'
import { tw } from '../styles'

type Props = NativeStackScreenProps<MainParamList, 'Latest'>

export const Latest: FunctionComponent<Props> = () => (
  <View style={tw`items-center justify-center flex-1`}>
    <Image
      source={require('../../assets/img/secret.png')}
      style={tw`w-32 h-32`}
    />
    <Text style={tw`mt-8 text-4xl text-black font-satoshi-bold`}>Secret</Text>
    <Text style={tw`text-lg text-gray-600 font-satoshi-medium`}>
      Share your secrets, anonymously
    </Text>
  </View>
)
