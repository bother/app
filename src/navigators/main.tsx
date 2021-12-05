import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'

import { TabBar } from '../components'
import { Latest, Nearby, Popular } from '../scenes'

export type MainParamList = {
  Latest: undefined
  Popular: undefined
  Nearby: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<MainParamList>()

export const MainNavigator: FunctionComponent = () => (
  <Navigator
    screenOptions={
      {
        // tabBar: TabBar
        // gestureEnabled: true
        // header: Header
      }
    }
    tabBar={TabBar}>
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
