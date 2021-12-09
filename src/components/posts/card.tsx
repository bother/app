import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'

import { RootParamList } from '../../navigators'
import { tw } from '../../styles'
import { Post } from '../../types'
import { Avatar } from '../common/avatar'
import { Icon } from '../common/icon'

type Props = {
  post: Post
  unlink?: boolean
  style?: StyleProp<ViewStyle>
}

export const PostCard: FunctionComponent<Props> = ({ post, style, unlink }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootParamList>>()

  return (
    <Pressable
      onPress={() => {
        if (unlink) {
          return
        }

        navigate('Post', {
          id: post.id
        })
      }}
      style={[tw`flex-row items-center p-4`, style]}>
      <Avatar seed={post.id + post.userId} size={48} />

      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-base text-black font-bother-regular`}>
          {post.body}
        </Text>

        <View style={tw`flex-row items-center mt-4`}>
          <Icon color={tw.color('gray-600')} name="clock" size={20} />
          <Text style={tw`ml-2 text-sm text-gray-600 font-bother-medium`}>
            {formatDistanceToNowStrict(parseISO(post.createdAt))}
          </Text>

          <Icon
            color={tw.color('gray-600')}
            name="thumb-up"
            size={20}
            style={tw`ml-4`}
          />
          <Text style={tw`ml-2 text-sm text-gray-600 font-bother-medium`}>
            {post.votes}
          </Text>

          <Icon
            color={tw.color('gray-600')}
            name="comments"
            size={20}
            style={tw`ml-4`}
          />
          <Text style={tw`ml-2 text-sm text-gray-600 font-bother-medium`}>
            {post.comments}
          </Text>

          <Icon
            color={tw.color('gray-600')}
            name="marker"
            size={20}
            style={tw`ml-4`}
          />
          <Text style={tw`ml-2 text-sm text-gray-600 font-bother-medium`}>
            2km
          </Text>
        </View>
      </View>
    </Pressable>
  )
}
