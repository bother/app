import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React, { FunctionComponent } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClientProvider } from 'react-query'

import { AuthContextProvider } from './contexts'
import { useSignIn } from './hooks'
import { client, FONTS } from './lib'
import { RootNavigator } from './navigators'
import { navTheme, tw } from './styles'

export const Bother: FunctionComponent = () => {
  const [loaded] = useFonts(FONTS)

  const { loading } = useSignIn()

  if (!loaded || loading) {
    return <AppLoading />
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={tw`flex-1`}>
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
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
