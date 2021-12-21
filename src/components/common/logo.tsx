import React, { FunctionComponent } from 'react'
import { Image, ImageStyle, StyleProp } from 'react-native'

import { tw } from '../../styles'

type Props = {
  size?: number
  style?: StyleProp<ImageStyle>
}

export const Logo: FunctionComponent<Props> = ({ size = 128, style }) => (
  <Image
    source={require('../../../assets/img/bother.png')}
    style={[tw`w-[${size}px] h-[${size}px]`, style]}
  />
)
