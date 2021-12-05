import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { FunctionComponent } from 'react'
import { Image, Text, View } from 'react-native'

import { MainParamList } from '../navigators'
import { tw } from '../styles'

type Props = NativeStackScreenProps<MainParamList, 'Create'>

export const Empty: FunctionComponent<Props> = () => (
  <View style={tw`items-center justify-center flex-1`}>
    <StatusBar style="dark" />

    <Image
      source={require('../../assets/img/secret.png')}
      style={tw`w-32 h-32`}
    />
    <Text style={tw`mt-8 text-4xl text-black font-secret-bold`}>Secret</Text>
    <Text style={tw`text-lg text-gray-600 font-secret-medium`}>
      Share your secrets, anonymously
    </Text>
  </View>
)
