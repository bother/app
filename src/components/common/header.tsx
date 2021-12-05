import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { FunctionComponent } from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { tw } from '../../styles'
import { ArrowIcon } from './icon'

export const Header: FunctionComponent<NativeStackHeaderProps> = ({
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

      {!!back && (
        <Pressable
          onPress={navigation.goBack}
          style={tw`absolute bottom-0 left-0 z-10 p-4`}>
          <ArrowIcon color={tw.color('white')} size={20} />
        </Pressable>
      )}
    </View>
  </SafeAreaView>
)
