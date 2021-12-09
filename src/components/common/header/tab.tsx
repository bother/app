import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'expo-status-bar'
import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { tw } from '../../../styles'

export const TabHeader: FunctionComponent<BottomTabHeaderProps> = ({
  options,
  route
}) => (
  <SafeAreaView edges={['top']} style={tw`bg-primary-600`}>
    <StatusBar style="light" />

    <View style={tw`p-3`}>
      <Text style={tw`text-lg text-center text-white font-bother-bold`}>
        {options.title ?? route.name}
      </Text>

      {options.headerLeft && (
        <View style={tw`absolute bottom-0 left-0 z-10 flex-row`}>
          {options.headerLeft({})}
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
