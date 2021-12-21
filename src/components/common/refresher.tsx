import React, { FunctionComponent } from 'react'
import { RefreshControl, RefreshControlProps } from 'react-native'

import { tw } from '../../styles'

type Props = Pick<RefreshControlProps, 'onRefresh' | 'refreshing'>

export const Refresher: FunctionComponent<Props> = (props) => (
  <RefreshControl
    {...props}
    colors={[
      tw.color('primary-500'),
      tw.color('primary-600'),
      tw.color('primary-700')
    ]}
    tintColor={tw.color('primary-600')}
  />
)
