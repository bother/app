import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import React, { FunctionComponent } from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { tw } from '../../../styles'

export const TopTabBar: FunctionComponent<MaterialTopTabBarProps> = ({
  descriptors,
  navigation,
  state
}) => (
  <SafeAreaView edges={['top']} style={tw`flex-row bg-primary-600`}>
    {state.routes.map((route, index) => {
      const isFocused = state.index === index

      const { options } = descriptors[route.key]

      return (
        <Pressable
          key={route.key}
          onPress={() => navigation.navigate(route.name)}
          style={tw`items-center flex-1 p-3`}>
          <View
            style={tw.style('p-2 rounded-lg', isFocused && 'bg-primary-800')}>
            <Text style={tw`text-sm leading-tight text-white font-secret-bold`}>
              {options.title ?? route.name}
            </Text>
          </View>
        </Pressable>
      )
    })}
  </SafeAreaView>
)
