import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FunctionComponent } from 'react'
import { ScrollView, View } from 'react-native'

import { ArrowIcon, Icon, Message } from '../components'
import { MainParamList } from '../navigators'
import { tw } from '../styles'
import { ArrowIconDirection, IconName } from '../types'

type Props = NativeStackScreenProps<MainParamList, 'Profile'>

export const Profile: FunctionComponent<Props> = () => (
  <ScrollView
    contentContainerStyle={tw`items-center justify-center flex-grow`}
    style={tw`flex-1`}>
    <Message message="This is an error message" type="error" />
    <Message message="This is a message" style={tw`mt-4`} type="message" />
    <Message
      message="This is a success message"
      style={tw`mt-4`}
      type="success"
    />
    <Message
      message="This is a warning message"
      style={tw`mt-4`}
      type="warning"
    />

    <View style={tw`flex-row mt-8`}>
      {['up', 'down', 'left', 'right'].map((direction, index) => (
        <ArrowIcon
          direction={direction as ArrowIconDirection}
          key={direction}
          style={tw.style(index > 0 && 'ml-4')}
        />
      ))}
    </View>

    <View style={tw`flex-row mt-8`}>
      {['clock', 'comments', 'thumb-up'].map((name, index) => (
        <Icon
          key={name}
          name={name as IconName}
          style={tw.style(index > 0 && 'ml-4')}
        />
      ))}
    </View>
  </ScrollView>
)
