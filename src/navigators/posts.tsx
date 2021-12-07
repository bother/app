import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FunctionComponent } from 'react'

import { StackHeader } from '../components'
import { Post } from '../scenes'
import { FeedNavigator } from './feed'

export type PostsParamList = {
  Feed: undefined
  Post: {
    id: number
  }
}

const { Navigator, Screen } = createNativeStackNavigator<PostsParamList>()

export const PostsNavigator: FunctionComponent = () => (
  <Navigator
    screenOptions={{
      header: StackHeader
    }}>
    <Screen
      component={FeedNavigator}
      name="Feed"
      options={{
        headerShown: false,
        title: 'Posts'
      }}
    />
    <Screen
      component={Post}
      name="Post"
      options={{
        title: 'Post'
      }}
    />
  </Navigator>
)
