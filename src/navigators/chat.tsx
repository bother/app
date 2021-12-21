import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useWindowDimensions } from 'react-native'

import { StackHeader } from '../components'
import { Conversation, Conversations } from '../scenes'

export type ChatParamList = {
  Conversations: undefined
  Conversation: {
    id: number
  }
}

const { Navigator, Screen } = createStackNavigator<ChatParamList>()

export const ChatNavigator: FunctionComponent = () => {
  const { width } = useWindowDimensions()

  return (
    <Navigator
      initialRouteName="Conversations"
      screenOptions={{
        gestureResponseDistance: width,
        header: StackHeader
      }}>
      <Screen component={Conversations} name="Conversations" />
      <Screen component={Conversation} name="Conversation" />
    </Navigator>
  )
}
