import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { PostsParamList } from '../navigators'
import { tw } from '../styles'

type Props = BottomTabScreenProps<PostsParamList, 'Post'>

export const Post: FunctionComponent<Props> = ({ route: { params } }) => (
  <View style={tw`flex-1 p-4`}>
    <Text>{JSON.stringify(params, null, 2)}</Text>
  </View>
)
