import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FunctionComponent } from 'react'

import { Header } from '../components'
import { Home, SignIn } from '../scenes'

export type LandingParamList = {
  Home: undefined
  SignIn: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<LandingParamList>()

export const LandingNavigator: FunctionComponent = () => (
  <Navigator
    screenOptions={{
      gestureEnabled: true,
      header: Header
    }}>
    <Screen
      component={Home}
      name="Home"
      options={{
        headerShown: false,
        title: 'Home'
      }}
    />
    <Screen
      component={SignIn}
      name="SignIn"
      options={{
        title: 'Sign in'
      }}
    />
  </Navigator>
)
