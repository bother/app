import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { Post } from '../scenes'
import { colors } from '../styles'
import { PostsNavigator } from './posts'

export type FeedParams = {
  Posts: undefined
  Post: {
    id: string
  }
}

const { Navigator, Screen } = createStackNavigator<FeedParams>()

export const FeedNavigator: FunctionComponent = () => (
  <Navigator
    headerMode="none"
    mode="modal"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.screen.feed
      }
    }}>
    <Screen component={PostsNavigator} name="Posts" />
    <Screen
      component={Post}
      name="Post"
      options={{
        ...TransitionPresets.ModalPresentationIOS,
        cardOverlayEnabled: true,
        headerShown: false
      }}
    />
  </Navigator>
)
