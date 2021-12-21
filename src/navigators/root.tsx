import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useWindowDimensions } from 'react-native'

import { PostHeader } from '../components'
import { useLocation } from '../hooks'
import { Post } from '../scenes'
import { MainNavigator } from './main'

export type RootParamList = {
  Main: undefined
  Post: {
    id: number
  }
}

const { Navigator, Screen } = createStackNavigator<RootParamList>()

export const RootNavigator: FunctionComponent = () => {
  useLocation()

  const { width } = useWindowDimensions()

  return (
    <Navigator
      screenOptions={{
        gestureResponseDistance: width
      }}>
      <Screen
        component={MainNavigator}
        name="Main"
        options={{
          headerShown: false
        }}
      />

      <Screen
        component={Post}
        name="Post"
        options={({ route }) => ({
          header: () => <PostHeader id={route.params.id} />,
          presentation: 'modal',
          title: 'Post'
        })}
      />
    </Navigator>
  )
}
