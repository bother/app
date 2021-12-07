import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'

import { BottomTabBar, TabHeader } from '../components'
import { CreatePost, Empty, Profile } from '../scenes'
import { PostsNavigator } from './posts'

export type MainParamList = {
  Conversations: undefined
  CreatePost: undefined
  Posts: undefined
  Profile: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<MainParamList>()

export const MainNavigator: FunctionComponent = () => (
  <Navigator
    screenOptions={{
      header: TabHeader
    }}
    tabBar={BottomTabBar}>
    <Screen
      component={PostsNavigator}
      name="Posts"
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
      component={Empty}
      name="Conversations"
      options={{
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
