import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { tw } from '../../styles'
import { Button } from './button'

type Props = {
  label: string
  message: string

  onPress: () => void
}

export const Oops: FunctionComponent<Props> = ({ label, message, onPress }) => (
  <View style={tw`items-center justify-center flex-1`}>
    <Svg
      fill={tw.color('accent-600')}
      height={128}
      viewBox="0 0 24 24"
      width={128}>
      <Path
        d="M21.73414,18,13.71768,4a1.97521,1.97521,0,0,0-3.43536,0L2.26586,18a2.01362,2.01362,0,0,0,0,2,1.97952,1.97952,0,0,0,1.71768,1H20.01646a1.97952,1.97952,0,0,0,1.71768-1A2.01362,2.01362,0,0,0,21.73414,18Z"
        opacity=".3"
      />
      <Path d="M6,6a.99676.99676,0,0,1-.707-.293l-2-2A.99989.99989,0,0,1,4.707,2.293l2,2A1,1,0,0,1,6,6Z" />
      <Path d="M3.999,9a.99607.99607,0,0,1-.44629-.10547l-2-1a1.00012,1.00012,0,0,1,.89454-1.78906l2,1A1,1,0,0,1,3.999,9Z" />
      <Path d="M18,6a1,1,0,0,1-.707-1.707l2-2A.99989.99989,0,1,1,20.707,3.707l-2,2A.99676.99676,0,0,1,18,6Z" />
      <Path d="M20.001,9a1,1,0,0,1-.44825-1.89453l2-1a1.00012,1.00012,0,0,1,.89454,1.78906l-2,1A.99607.99607,0,0,1,20.001,9Z" />
      <Path d="M13.25,17.63316a1.255,1.255,0,1,1-2.5,0A1.31608,1.31608,0,0,1,11.9935,16.25,1.32819,1.32819,0,0,1,13.25,17.63316ZM10.75,14.047V9.203A1.22718,1.22718,0,0,1,12,8h0a1.22718,1.22718,0,0,1,1.25,1.203V14.047A1.22718,1.22718,0,0,1,12,15.25h0A1.22718,1.22718,0,0,1,10.75,14.047Z" />
    </Svg>

    <Text style={tw`mt-8 text-2xl text-black font-secret-medium`}>
      {message}
    </Text>

    <Button onPress={onPress} style={tw`mt-4`} title={label} />
  </View>
)
