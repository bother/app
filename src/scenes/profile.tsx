import AsyncStorage from '@react-native-async-storage/async-storage'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import * as SecureStore from 'expo-secure-store'
import React, { FunctionComponent } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'

import { Button, Icon, Message } from '../components'
import { icons } from '../components/common/icon'
import { useUser } from '../contexts'
import { supabase } from '../lib'
import { MainParamList } from '../navigators'
import { tw } from '../styles'
import { IconName, MessageType } from '../types'

type Props = BottomTabScreenProps<MainParamList, 'Profile'>

export const Profile: FunctionComponent<Props> = () => {
  const { user } = useUser()

  supabase
    .rpc('start_conversation', {
      recipientid: '3601493e-d7fd-484d-93cd-956ed13a7aff',
      targetid: 1003,
      targettype: 'post',
      userid: user.id
    })
    .then((foo) => console.log(foo))

  return (
    <ScrollView
      contentContainerStyle={tw`items-center justify-center flex-grow p-8`}
      style={tw`flex-1`}>
      {['error', 'message', 'success', 'warning'].map((type, index) => (
        <Message
          key={type}
          message={type}
          style={tw.style(index > 0 && 'mt-4')}
          type={type as MessageType}
        />
      ))}

      <View style={tw`flex-row mt-8`}>
        {Object.keys(icons).map((name, index) => (
          <Icon
            key={name}
            name={name as IconName}
            style={tw.style(index > 0 && 'ml-4')}
          />
        ))}
      </View>

      <Text selectable style={tw`my-8 text-base text-black font-bother-medium`}>
        {user.id}
      </Text>

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
