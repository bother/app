import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FunctionComponent } from 'react'

import { PostHeader } from '../components'
import { Post } from '../scenes'
import { MainNavigator } from './main'

export type RootParamList = {
  Main: undefined
  Post: {
    id: number
  }
}

const { Navigator, Screen } = createNativeStackNavigator<RootParamList>()

export const RootNavigator: FunctionComponent = () => (
  <Navigator>
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
