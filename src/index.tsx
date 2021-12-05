import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React, { FunctionComponent, useEffect } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { UserContextProvider } from './contexts'
import { FONTS } from './lib'
import { LandingNavigator, MainNavigator } from './navigators'
import { useAuth } from './stores'
import { navTheme, tw } from './styles'

export const Secret: FunctionComponent = () => {
  const [loaded] = useFonts(FONTS)

  const [{ auth, loading }, { init }] = useAuth()

  useEffect(() => {
    init()
  }, [init])

  if (!loaded || loading) {
    return <AppLoading />
  }

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}>
        <UserContextProvider>
          <NavigationContainer theme={navTheme}>
            <StatusBar style="light" />

            {auth ? <MainNavigator /> : <LandingNavigator />}
          </NavigationContainer>
        </UserContextProvider>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}
