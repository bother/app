import React, { FunctionComponent } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { tw } from '../../../styles'
import { HeaderIconName } from '../../../types'

type Props = {
  name: HeaderIconName
  style?: StyleProp<ViewStyle>
}

export const HeaderIcon: FunctionComponent<Props> = ({ name, style }) => (
  <Svg
    fill={tw.color('white')}
    height={20}
    style={style}
    viewBox="0 0 48 48"
    width={20}>
    {icons[name]}
  </Svg>
)

export const icons = {
  back: (
    <Path d="M20.586,39.414C20.977,39.805,21.488,40,22,40s1.023-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828L12.828,26H40 c1.104,0,2-0.896,2-2s-0.896-2-2-2H12.828l10.586-10.586c0.781-0.781,0.781-2.047,0-2.828c-0.781-0.781-2.047-0.781-2.828,0l-14,14 c-0.781,0.781-0.781,2.047,0,2.828L20.586,39.414z" />
  ),
  plus: (
    <Path d="M 23.970703 4.9726562 A 2.0002 2.0002 0 0 0 22 7 L 22 22 L 7 22 A 2.0002 2.0002 0 1 0 7 26 L 22 26 L 22 41 A 2.0002 2.0002 0 1 0 26 41 L 26 26 L 41 26 A 2.0002 2.0002 0 1 0 41 22 L 26 22 L 26 7 A 2.0002 2.0002 0 0 0 23.970703 4.9726562 z" />
  )
}
