import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'

import { TabBar } from '../components'
import { Empty, Latest, Nearby, Popular, Profile } from '../scenes'

export type MainParamList = {
  Create: undefined
  Latest: undefined
  Nearby: undefined
  Popular: undefined
  Profile: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<MainParamList>()

export const MainNavigator: FunctionComponent = () => (
  <Navigator tabBar={TabBar}>
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
    <Screen
      component={Empty}
      name="Create"
      options={{
        title: 'New post'
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
