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
  send: (
    <Path d="M 5.4453125 4.0019531 A 1.50015 1.50015 0 0 0 4.1015625 6.0410156 L 9.6015625 20.242188 A 1.50015 1.50015 0 0 0 10.759766 21.179688 L 25.701172 23.605469 C 26.073404 23.665819 26.037109 23.77328 26.037109 24 C 26.037109 24.22672 26.073399 24.334183 25.701172 24.394531 L 10.759766 26.820312 A 1.50015 1.50015 0 0 0 9.6015625 27.757812 L 4.1015625 41.958984 A 1.50015 1.50015 0 0 0 6.1699219 43.841797 L 43.169922 25.341797 A 1.50015 1.50015 0 0 0 43.169922 22.658203 L 6.1699219 4.1582031 A 1.50015 1.50015 0 0 0 5.4453125 4.0019531 z" />
  )
}
