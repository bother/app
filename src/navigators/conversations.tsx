import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useWindowDimensions } from 'react-native'

import { StackHeader } from '../components'
import { Conversation, Conversations } from '../scenes'

export type ConversationsParamList = {
  Conversations: undefined
  Conversation: {
    id: number
  }
}

const { Navigator, Screen } = createStackNavigator<ConversationsParamList>()

export const ConversationsNavigator: FunctionComponent = () => {
  const { width } = useWindowDimensions()

  return (
    <Navigator
      screenOptions={{
        gestureResponseDistance: width,
        header: StackHeader
      }}>
      <Screen component={Conversations} name="Conversations" />
      <Screen component={Conversation} name="Conversation" />
    </Navigator>
  )
}
