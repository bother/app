import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { FunctionComponent } from 'react'

import { TopTabBar } from '../components'
import { Latest, Nearby, Popular } from '../scenes'

export type FeedParamList = {
  Latest: undefined
  Nearby: undefined
  Popular: undefined
}

const { Navigator, Screen } = createMaterialTopTabNavigator<FeedParamList>()

export const FeedNavigator: FunctionComponent = () => (
  <Navigator
    screenOptions={{
      lazy: true
    }}
    tabBar={TopTabBar}>
    <Screen
      component={Popular}
      name="Popular"
      options={{
        title: 'Popular'
      }}
    />
    <Screen
      component={Nearby}
      name="Nearby"
      options={{
        title: 'Nearby'
      }}
    />
    <Screen
      component={Latest}
      name="Latest"
      options={{
        title: 'Latest'
      }}
    />
  </Navigator>
)
