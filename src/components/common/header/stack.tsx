import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { tw } from '../../../styles'
import { HeaderButton } from './button'

export const StackHeader: FunctionComponent<NativeStackHeaderProps> = ({
  back,
  navigation,
  options,
  route
}) => (
  <SafeAreaView edges={['top']} style={tw`bg-primary-600`}>
    <StatusBar style="light" />

    <View style={tw`p-3`}>
      <Text style={tw`text-lg text-center text-white font-secret-bold`}>
        {options.title ?? route.name}
      </Text>

      {(back || options.headerLeft) && (
        <View style={tw`absolute bottom-0 left-0 z-10 flex-row`}>
          {back && <HeaderButton icon="back" onPress={navigation.goBack} />}

          {options.headerLeft?.({
            canGoBack: navigation.canGoBack()
          })}
        </View>
      )}

      {options.headerRight && (
        <View style={tw`absolute bottom-0 right-0 z-10 flex-row`}>
          {options.headerRight({})}
        </View>
      )}
    </View>
  </SafeAreaView>
)
