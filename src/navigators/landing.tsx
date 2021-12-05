import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FunctionComponent } from 'react'

import { Header } from '../components'
import { Landing, SignIn } from '../scenes'

export type LandingParamList = {
  Landing: undefined
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
      component={Landing}
      name="Landing"
      options={{
        headerShown: false
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
