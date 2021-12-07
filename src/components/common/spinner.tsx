import React, { FunctionComponent } from 'react'
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'

import { tw } from '../../styles'

type Props = Pick<ActivityIndicatorProps, 'color' | 'size' | 'style'>

export const Spinner: FunctionComponent<Props> = ({
  color = tw.color('primary-600'),
  size = 'small',
  style
}) => <ActivityIndicator color={color} size={size} style={style} />
