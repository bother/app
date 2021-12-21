import AsyncStorage from '@react-native-async-storage/async-storage'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import * as SecureStore from 'expo-secure-store'
import React, { FunctionComponent } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'

import { Button, Icon, Logo, Message } from '../components'
import { icons } from '../components/common/icon'
import { useAuth } from '../contexts'
import { supabase } from '../lib'
import { MainParamList } from '../navigators'
import { tw } from '../styles'
import { IconName, MessageType } from '../types'

type Props = BottomTabScreenProps<MainParamList, 'Profile'>

export const Profile: FunctionComponent<Props> = () => {
  const { session, user } = useAuth()

  return (
    <ScrollView
      contentContainerStyle={tw`items-center justify-center flex-grow p-8`}
      style={tw`flex-1`}>
      <Logo />

      <View style={tw`w-full mt-8`}>
        {['error', 'message', 'success', 'warning'].map((type, index) => (
          <Message
            key={type}
            message={type}
            style={tw.style(index > 0 && 'mt-4')}
            type={type as MessageType}
          />
        ))}
      </View>

      <View style={tw`flex-row flex-wrap mt-4 -mx-4 -mb-4`}>
        {Object.keys(icons).map((name) => (
          <Icon key={name} name={name as IconName} style={tw`m-4`} />
        ))}
      </View>

      {user && (
        <Text
          selectable
          style={tw`my-8 text-base text-black font-bother-medium`}>
          {user.id}
        </Text>
      )}

      {session && (
        <Text
          selectable
          style={tw`my-8 text-base text-black font-bother-medium`}>
          {session.access_token}
        </Text>
      )}

      <Button
        onPress={async () => {
          await supabase.auth.signOut()
          await SecureStore.deleteItemAsync('id')
          await AsyncStorage.removeItem('supabase.auth.token')

          Alert.alert('Success', 'Reload the app')
        }}
        style={tw`mt-8`}
        title="Sign out"
      />
    </ScrollView>
  )
}
