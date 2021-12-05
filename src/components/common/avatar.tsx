import React, { FunctionComponent } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Boring from 'react-native-boring-avatars'

import { tw } from '../../styles'

type Props = {
  light?: boolean
  seed: string
  size?: number
  style?: StyleProp<ViewStyle>
}

export const Avatar: FunctionComponent<Props> = ({
  light,
  seed,
  size = 24,
  style
}) => (
  <Boring
    colors={[
      'red',
      'orange',
      'amber',
      'yellow',
      'lime',
      'green',
      'emerald',
      'teal',
      'cyan',
      'sky',
      'blue',
      'indigo',
      'violet',
      'purple',
      'fuchsia',
      'pink',
      'rose'
    ].map((name) => tw.color(`${name}-${light ? 200 : 600}`))}
    name={seed}
    size={size}
    style={style}
    variant="beam"
  />
)
