import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent, ReactNode } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Circle, Path } from 'react-native-svg'

import { tw } from '../../styles'

export const TabBar: FunctionComponent<BottomTabBarProps> = ({
  navigation,
  state
}) => (
  <SafeAreaView
    edges={['bottom']}
    style={tw`flex-row bg-white border-t border-gray-200`}>
    {state.routes.map((route, index) => {
      const isFocused = state.index === index

      return (
        <Pressable
          key={route.key}
          onPress={() => {
            const event = navigation.emit({
              canPreventDefault: true,
              target: route.key,
              type: 'tabPress'
            })

            if (!isFocused && !event.defaultPrevented) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              navigation.navigate({
                merge: true,
                name: route.name
              })
            }
          }}
          style={tw`items-center flex-1 p-3`}>
          <Svg
            fill={tw.color(isFocused ? 'primary-600' : 'gray-400')}
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

const icons: Record<string, ReactNode> = {
  Latest: (
    <>
      <Circle cx="12" cy="12" opacity=".35" r="10" />
      <Path d="M15.203,13.789l-1.167-1.509c-0.35-0.453-0.563-0.997-0.615-1.567L13,6c0-0.552-0.448-1-1-1h0c-0.552,0-1,0.448-1,1	l-0.381,4.885c-0.075,0.96,0.316,1.898,1.051,2.521l2.119,1.797c0.391,0.391,1.024,0.391,1.414,0l0,0	C15.594,14.813,15.594,14.179,15.203,13.789z" />
    </>
  ),
  Nearby: (
    <>
      <Path
        d="M4,10c0-4.418,3.582-8,8-8s8,3.582,8,8c0,3.564-4.064,8.652-6.399,11.28	c-0.851,0.958-2.351,0.958-3.202,0C8.064,18.652,4,13.564,4,10z"
        opacity=".35"
      />
      <Circle cx="12" cy="10" r="3" />
    </>
  ),
  Popular: (
    <>
      <Path
        d="M20,4H4v16.27c0,1.285,1.352,2.12,2.501,1.546L12,19.066l5.499,2.75C18.648,22.39,20,21.554,20,20.27	V4z"
        opacity=".35"
      />
      <Path d="M19.5,3c-0.386,0-14.614,0-15,0C3.672,3,3,3.672,3,4.5S3.672,6,4.5,6c0.386,0,14.614,0,15,0C20.328,6,21,5.328,21,4.5	S20.328,3,19.5,3z" />
    </>
  )
}
