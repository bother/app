import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { FunctionComponent } from 'react'
import { Image, Text, View } from 'react-native'

import { Button } from '../components'
import { LandingParamList } from '../navigators'
import { tw } from '../styles'

type Props = NativeStackScreenProps<LandingParamList, 'Home'>

export const Home: FunctionComponent<Props> = ({ navigation }) => (
  <View style={tw`items-center justify-center flex-1`}>
    <StatusBar style="dark" />

    <Image
      source={require('../../assets/img/secret.png')}
      style={tw`w-32 h-32`}
    />
    <Text style={tw`mt-8 text-4xl text-black font-satoshi-bold`}>Secret</Text>
    <Text style={tw`text-lg text-gray-600 font-satoshi-medium`}>
      Share your secrets, anonymously
    </Text>

    <Button
      onPress={() => navigation.navigate('SignIn')}
      style={tw`mt-8`}
      title="Sign in"
    />
  </View>
)
