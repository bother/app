import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'

import { BottomTabBar, TabHeader } from '../components'
import { CreatePost, Profile } from '../scenes'
import { ChatNavigator } from './chat'
import { FeedNavigator } from './feed'

export type MainParamList = {
  Chat: undefined
  CreatePost: undefined
  Feed: undefined
  Profile: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<MainParamList>()

export const MainNavigator: FunctionComponent = () => (
  <Navigator
    initialRouteName="Feed"
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
      component={ChatNavigator}
      name="Chat"
      options={{
        headerShown: false,
        lazy: false,
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
