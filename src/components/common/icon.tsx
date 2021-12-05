import React, { FunctionComponent } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { tw } from '../../styles'

type ArrowProps = {
  color?: string
  size?: number
  style?: StyleProp<ViewStyle>
}

export const ArrowIcon: FunctionComponent<ArrowProps> = ({
  color = tw.color('black'),
  size = 24,
  style
}) => (
  <Svg
    fill={color}
    height={size}
    style={style}
    viewBox="0 0 48 48"
    width={size}>
    <Path d="M20.586,39.414C20.977,39.805,21.488,40,22,40s1.023-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828L12.828,26H40 c1.104,0,2-0.896,2-2s-0.896-2-2-2H12.828l10.586-10.586c0.781-0.781,0.781-2.047,0-2.828c-0.781-0.781-2.047-0.781-2.828,0l-14,14 c-0.781,0.781-0.781,2.047,0,2.828L20.586,39.414z" />
  </Svg>
)
