import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React, { FunctionComponent, useEffect } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClientProvider } from 'react-query'

import { AuthContextProvider } from './contexts'
import { useAuth } from './hooks'
import { client, FONTS } from './lib'
import { RootNavigator } from './navigators'
import { useLocation } from './stores'
import { navTheme, tw } from './styles'

export const Bother: FunctionComponent = () => {
  const [loaded] = useFonts(FONTS)

  const { loading } = useAuth()

  const [, { fetch }] = useLocation()

  useEffect(() => {
    fetch()
  }, [fetch])

  if (!loaded || loading) {
    return <AppLoading />
  }

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}>
        <QueryClientProvider client={client}>
          <AuthContextProvider>
            <NavigationContainer theme={navTheme}>
              <StatusBar style="light" />

              <RootNavigator />
            </NavigationContainer>
          </AuthContextProvider>
        </QueryClientProvider>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}
