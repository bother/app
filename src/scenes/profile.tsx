import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'
import { ScrollView, View } from 'react-native'

import { Icon, Message } from '../components'
import { icons } from '../components/common/icon'
import { MainParamList } from '../navigators'
import { tw } from '../styles'
import { IconName, MessageType } from '../types'

type Props = BottomTabScreenProps<MainParamList, 'Profile'>

export const Profile: FunctionComponent<Props> = () => (
  <ScrollView
    contentContainerStyle={tw`items-center justify-center flex-grow`}
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
  </ScrollView>
)
