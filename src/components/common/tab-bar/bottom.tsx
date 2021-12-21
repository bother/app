import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent, ReactNode } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Circle, Path } from 'react-native-svg'

import { useKeyboard } from '../../../hooks'
import { tw } from '../../../styles'

export const BottomTabBar: FunctionComponent<BottomTabBarProps> = ({
  navigation,
  state
}) => {
  const keyboard = useKeyboard('will')

  if (keyboard) {
    return null
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex-row bg-white border-t border-gray-200`}>
      {state.routes.map((route, index) => {
        const focused = state.index === index

        return (
          <Pressable
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                canPreventDefault: true,
                target: route.key,
                type: 'tabPress'
              })

              if (focused || event.defaultPrevented) {
                return
              }

              navigation.navigate({
                name: route.name,
                params: {}
              })
            }}
            style={tw`items-center flex-1 p-4`}>
            <Svg
              fill={tw.color(focused ? 'primary-600' : 'gray-400')}
              height={24}
              viewBox="0 0 24 24"
              width={24}>
              {icons[route.name]}
            </Svg>
          </Pressable>
        )
      })}
    </SafeAreaView>
  )
}

const icons: Record<string, ReactNode> = {
  Chat: (
    <>
      <Path
        d="M16,2H5C3.343,2,2,3.343,2,5v9c0,1.622,1.29,2.936,2.9,2.99l0.756,2.32c0.234,0.718,1.148,0.927,1.672,0.383L9.916,17H16 c1.657,0,3-1.343,3-3V5C19,3.343,17.657,2,16,2z"
        opacity=".35"
      />
      <Path d="M19,4h-0.184C18.928,4.314,19,4.647,19,5v9c0,1.657-1.343,3-3,3H9.916l-1.922,1.999C7.996,18.999,7.998,19,8,19h6.084	l2.589,2.693c0.523,0.544,1.438,0.335,1.672-0.383l0.756-2.32C20.71,18.936,22,17.622,22,16V7C22,5.343,20.657,4,19,4z" />
    </>
  ),
  CreatePost: (
    <>
      <Circle cx="12" cy="12" opacity=".3" r="10" />
      <Path d="M17,11h-3c-0.552,0-1-0.448-1-1V7c0-0.552-0.448-1-1-1s-1,0.448-1,1v3c0,0.552-0.448,1-1,1H7c-0.552,0-1,0.448-1,1	s0.448,1,1,1h3c0.552,0,1,0.448,1,1v3c0,0.552,0.448,1,1,1s1-0.448,1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1-0.448,1-1	S17.552,11,17,11z" />
    </>
  ),
  Feed: (
    <>
      <Path
        d="M20,4H4v16.27c0,1.285,1.352,2.12,2.501,1.546L12,19.066l5.499,2.75C18.648,22.39,20,21.554,20,20.27	V4z"
        opacity=".3"
      />
      <Path d="M19.5,3c-0.386,0-14.614,0-15,0C3.672,3,3,3.672,3,4.5S3.672,6,4.5,6c0.386,0,14.614,0,15,0C20.328,6,21,5.328,21,4.5	S20.328,3,19.5,3z" />
    </>
  ),
  Profile: (
    <>
      <Circle cx="12" cy="12" opacity=".3" r="10" />
      <Circle cx="12" cy="9" r="3" />
      <Path d="M17.883,15.784C17.574,14.755,16.63,14,15.5,14h-7c-1.13,0-2.074,0.755-2.383,1.784C7.362,17.717,9.529,19,12,19	S16.638,17.717,17.883,15.784z" />
    </>
  )
}
