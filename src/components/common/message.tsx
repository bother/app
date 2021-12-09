import React, { FunctionComponent } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

import { tw } from '../../styles'
import { MessageType } from '../../types'

type Props = {
  message: string
  type?: MessageType
  style?: StyleProp<ViewStyle>
}

export const Message: FunctionComponent<Props> = ({
  message,
  style,
  type = 'message'
}) => (
  <View
    style={[
      tw.style(
        'rounded-lg p-3 flex-row items-center',
        type === 'error'
          ? 'bg-rose-600'
          : type === 'success'
          ? 'bg-emerald-600'
          : type === 'warning'
          ? 'bg-amber-600'
          : 'bg-sky-600'
      ),
      style
    ]}>
    <Svg fill={tw.color('white')} height={24} viewBox="0 0 24 24" width={24}>
      {icons[type]}
    </Svg>

    <Text style={tw`flex-1 ml-2 text-base text-white font-secret-medium`}>
      {message}
    </Text>
  </View>
)

const icons = {
  error: (
    <>
      <Path
        d="M21.734,18.025L13.718,4.14C13.364,3.526,12.708,3.148,12,3.148s-1.364,0.378-1.718,0.992	L2.266,18.025c-0.354,0.614-0.354,1.369,0,1.984C2.62,20.622,3.275,21,3.984,21h16.033c0.708,0,1.364-0.378,1.718-0.992	C22.089,19.394,22.089,18.639,21.734,18.025z"
        opacity=".3"
      />
      <Path d="M13.179,17.746c0,0.353-0.205,1.254-1.185,1.254s-1.173-0.902-1.173-1.254c0-0.345,0.218-1.269,1.173-1.269	S13.179,17.401,13.179,17.746z M10.919,13.919V9.568c0-0.597,0.484-1.081,1.081-1.081h0c0.597,0,1.081,0.484,1.081,1.081v4.352	C13.081,14.516,12.597,15,12,15h0C11.403,15,10.919,14.516,10.919,13.919z" />
    </>
  ),
  message: (
    <>
      <Circle cx="12" cy="12" opacity=".3" r="10" />
      <Path d="M11,17v-5c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v5c0,0.552-0.448,1-1,1h0C11.448,18,11,17.552,11,17z" />
      <Circle cx="12" cy="7.5" r="1.5" />
    </>
  ),
  success: (
    <>
      <Circle cx="12" cy="12" opacity=".3" r="10" />
      <Path d="M11,16c-0.256,0-0.512-0.098-0.707-0.293l-3-3c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L11,13.586l4.293-4.293	c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-5,5C11.512,15.902,11.256,16,11,16z" />
    </>
  ),
  warning: (
    <>
      <Circle cx="12" cy="12" opacity=".3" r="10" />
      <Path d="M13.42,16.489c0,0.425-0.247,1.511-1.427,1.511s-1.412-1.086-1.412-1.511c0-0.415,0.263-1.529,1.412-1.529	S13.42,16.074,13.42,16.489z M10.698,12.499V7.259c0-0.719,0.583-1.302,1.302-1.302h0c0.719,0,1.302,0.583,1.302,1.302v5.241	c0,0.719-0.583,1.302-1.302,1.302h0C11.281,13.801,10.698,13.218,10.698,12.499z" />
    </>
  )
}
