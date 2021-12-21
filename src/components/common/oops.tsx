import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { tw } from '../../styles'
import { Button } from './button'

type Props = {
  icon?: keyof typeof icons
  label: string
  loading?: boolean
  message: string

  onPress: () => void
}

export const Oops: FunctionComponent<Props> = ({
  icon = 'error',
  label,
  loading,
  message,
  onPress
}) => (
  <View style={tw`items-center justify-center flex-1`}>
    <Svg
      fill={tw.color('rose-600')}
      height={128}
      viewBox="0 0 24 24"
      width={128}>
      {icons[icon]}
    </Svg>

    <Text
      style={tw`mx-8 my-8 text-xl text-center text-black font-bother-medium`}>
      {message}
    </Text>

    <Button loading={loading} onPress={onPress} title={label} />
  </View>
)

const icons = {
  empty: (
    <>
      <Path
        d="M21,15H3V8.001l1.555-3.285C5.051,3.668,6.107,3,7.266,3h9.467c1.16,0,2.216,0.668,2.712,1.717	L21,8.001V15z"
        opacity=".35"
      />
      <Path d="M3,8v10c0,1.657,1.343,3,3,3h12c1.657,0,3-1.343,3-3V8H3z M13,12c-0.186,0-1.814,0-2,0c-0.552,0-1-0.448-1-1	c0-0.552,0.448-1,1-1c0.186,0,1.814,0,2,0c0.552,0,1,0.448,1,1C14,11.552,13.552,12,13,12z" />
    </>
  ),
  error: (
    <>
      <Path
        d="M21.73414,18,13.71768,4a1.97521,1.97521,0,0,0-3.43536,0L2.26586,18a2.01362,2.01362,0,0,0,0,2,1.97952,1.97952,0,0,0,1.71768,1H20.01646a1.97952,1.97952,0,0,0,1.71768-1A2.01362,2.01362,0,0,0,21.73414,18Z"
        opacity=".3"
      />
      <Path d="M6,6a.99676.99676,0,0,1-.707-.293l-2-2A.99989.99989,0,0,1,4.707,2.293l2,2A1,1,0,0,1,6,6Z" />
      <Path d="M3.999,9a.99607.99607,0,0,1-.44629-.10547l-2-1a1.00012,1.00012,0,0,1,.89454-1.78906l2,1A1,1,0,0,1,3.999,9Z" />
      <Path d="M18,6a1,1,0,0,1-.707-1.707l2-2A.99989.99989,0,1,1,20.707,3.707l-2,2A.99676.99676,0,0,1,18,6Z" />
      <Path d="M20.001,9a1,1,0,0,1-.44825-1.89453l2-1a1.00012,1.00012,0,0,1,.89454,1.78906l-2,1A.99607.99607,0,0,1,20.001,9Z" />
      <Path d="M13.25,17.63316a1.255,1.255,0,1,1-2.5,0A1.31608,1.31608,0,0,1,11.9935,16.25,1.32819,1.32819,0,0,1,13.25,17.63316ZM10.75,14.047V9.203A1.22718,1.22718,0,0,1,12,8h0a1.22718,1.22718,0,0,1,1.25,1.203V14.047A1.22718,1.22718,0,0,1,12,15.25h0A1.22718,1.22718,0,0,1,10.75,14.047Z" />
    </>
  )
}
