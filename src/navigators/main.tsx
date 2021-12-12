import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'

import { BottomTabBar, TabHeader } from '../components'
import { CreatePost, Profile } from '../scenes'
import { ConversationsNavigator } from './conversations'
import { FeedNavigator } from './feed'

export type MainParamList = {
  Conversations: undefined
  CreatePost: undefined
  Feed: undefined
  Profile: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<MainParamList>()

export const MainNavigator: FunctionComponent = () => (
  <Navigator
    screenOptions={{
      header: TabHeader,
      lazy: true
    }}
    tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen
      component={FeedNavigator}
      name="Feed"
      options={{
        headerShown: false
      }}
    />
    <Screen
      component={CreatePost}
      name="CreatePost"
      options={{
        title: 'New post'
      }}
    />
    <Screen
      component={ConversationsNavigator}
      name="Conversations"
      options={{
        headerShown: false,
        title: 'Conversations'
      }}
    />
    <Screen
      component={Profile}
      name="Profile"
      options={{
        title: 'Profile'
      }}
    />
  </Navigator>
)
