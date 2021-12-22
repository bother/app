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
  close: (
    <Path d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z" />
  ),
  copy: (
    <Path d="M 18.5 5 C 15.467 5 13 7.467 13 10.5 L 13 32.5 C 13 35.533 15.467 38 18.5 38 L 34.5 38 C 37.533 38 40 35.533 40 32.5 L 40 10.5 C 40 7.467 37.533 5 34.5 5 L 18.5 5 z M 11 10 L 9.78125 10.8125 C 8.66825 11.5545 8 12.803625 8 14.140625 L 8 33.5 C 8 38.747 12.253 43 17.5 43 L 30.859375 43 C 32.197375 43 33.4465 42.33175 34.1875 41.21875 L 35 40 L 17.5 40 C 13.91 40 11 37.09 11 33.5 L 11 10 z" />
  ),
  done: (
    <Path d="M 42.960938 8.9804688 A 2.0002 2.0002 0 0 0 41.585938 9.5859375 L 17 34.171875 L 6.4140625 23.585938 A 2.0002 2.0002 0 1 0 3.5859375 26.414062 L 15.585938 38.414062 A 2.0002 2.0002 0 0 0 18.414062 38.414062 L 44.414062 12.414062 A 2.0002 2.0002 0 0 0 42.960938 8.9804688 z" />
  ),
  edit: (
    <Path d="M38.657 18.536l2.44-2.44c2.534-2.534 2.534-6.658 0-9.193-1.227-1.226-2.858-1.9-4.597-1.9s-3.371.675-4.597 1.901l-2.439 2.439L38.657 18.536zM27.343 11.464L9.274 29.533c-.385.385-.678.86-.848 1.375L5.076 41.029c-.179.538-.038 1.131.363 1.532C5.726 42.847 6.108 43 6.5 43c.158 0 .317-.025.472-.076l10.118-3.351c.517-.17.993-.463 1.378-.849l18.068-18.068L27.343 11.464z" />
  ),
  flag: (
    <Path d="M 8.5 6 A 1.50015 1.50015 0 0 0 7 7.5 L 7 42.5 A 1.50015 1.50015 0 1 0 10 42.5 L 10 33 L 41.5 33 A 1.50015 1.50015 0 0 0 42.699219 30.599609 L 34.375 19.5 L 42.699219 8.4003906 A 1.50015 1.50015 0 0 0 41.5 6 L 8.5 6 z" />
  ),
  save: (
    <Path d="M 11.5 6 C 8.467 6 6 8.467 6 11.5 L 6 36.5 C 6 39.533 8.467 42 11.5 42 L 12 42 L 12 27.5 C 12 25.57 13.57 24 15.5 24 L 32.5 24 C 34.43 24 36 25.57 36 27.5 L 36 42 L 36.5 42 C 39.533 42 42 39.533 42 36.5 L 42 15.5 C 42 15.072 41.816094 14.663906 41.496094 14.378906 L 32.496094 6.3789062 C 32.350094 6.2489063 32.181 6.1557969 32 6.0917969 L 32 14.5 C 32 16.43 30.43 18 28.5 18 L 16.5 18 C 14.57 18 13 16.43 13 14.5 L 13 6 L 11.5 6 z M 16 6 L 16 14.5 C 16 14.776 16.224 15 16.5 15 L 28.5 15 C 28.776 15 29 14.776 29 14.5 L 29 6 L 16 6 z M 15.5 27 C 15.224 27 15 27.224 15 27.5 L 15 42 L 33 42 L 33 27.5 C 33 27.224 32.776 27 32.5 27 L 15.5 27 z" />
  ),
  send: (
    <Path d="M 5.4453125 4.0019531 A 1.50015 1.50015 0 0 0 4.1015625 6.0410156 L 9.6015625 20.242188 A 1.50015 1.50015 0 0 0 10.759766 21.179688 L 25.701172 23.605469 C 26.073404 23.665819 26.037109 23.77328 26.037109 24 C 26.037109 24.22672 26.073399 24.334183 25.701172 24.394531 L 10.759766 26.820312 A 1.50015 1.50015 0 0 0 9.6015625 27.757812 L 4.1015625 41.958984 A 1.50015 1.50015 0 0 0 6.1699219 43.841797 L 43.169922 25.341797 A 1.50015 1.50015 0 0 0 43.169922 22.658203 L 6.1699219 4.1582031 A 1.50015 1.50015 0 0 0 5.4453125 4.0019531 z" />
  ),
  share: (
    <Path d="M 35.478516 5.9804688 A 2.0002 2.0002 0 0 0 34.085938 9.4140625 L 35.179688 10.507812 C 23.476587 10.680668 14 20.256715 14 32 A 2.0002 2.0002 0 1 0 18 32 C 18 22.427546 25.627423 14.702715 35.154297 14.517578 L 34.085938 15.585938 A 2.0002 2.0002 0 1 0 36.914062 18.414062 L 41.236328 14.091797 A 2.0002 2.0002 0 0 0 41.228516 10.900391 L 36.914062 6.5859375 A 2.0002 2.0002 0 0 0 35.478516 5.9804688 z M 12.5 6 C 8.9338464 6 6 8.9338464 6 12.5 L 6 35.5 C 6 39.066154 8.9338464 42 12.5 42 L 35.5 42 C 39.066154 42 42 39.066154 42 35.5 L 42 28 A 2.0002 2.0002 0 1 0 38 28 L 38 35.5 C 38 36.903846 36.903846 38 35.5 38 L 12.5 38 C 11.096154 38 10 36.903846 10 35.5 L 10 12.5 C 10 11.096154 11.096154 10 12.5 10 L 20 10 A 2.0002 2.0002 0 1 0 20 6 L 12.5 6 z" />
  )
}
