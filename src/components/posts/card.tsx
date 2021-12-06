import { formatDistanceToNow, parseISO } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'

import { tw } from '../../styles'
import { Post } from '../../types'
import { Avatar } from '../common/avatar'
import { Icon } from '../common/icon'

type Props = {
  post: Post
  style?: StyleProp<ViewStyle>

  onPress?: () => void
}

export const PostCard: FunctionComponent<Props> = ({
  onPress,
  post,
  style
}) => (
  <Pressable onPress={onPress} style={[tw`flex-row items-center p-4`, style]}>
    <Avatar seed={post.id + post.userId} size={48} />

    <View style={tw`flex-1 ml-4`}>
      <Text style={tw`text-base text-black font-secret-regular`}>
        {post.body}
      </Text>

      <View style={tw`flex-row items-center mt-4`}>
        <Icon color={tw.color('gray-600')} name="clock" size={20} />
        <Text style={tw`ml-2 text-sm text-gray-600 font-secret-medium`}>
          {formatDistanceToNow(parseISO(post.createdAt))}
        </Text>

        <Icon
          color={tw.color('gray-600')}
          name="thumb-up"
          size={20}
          style={tw`ml-4`}
        />
        <Text style={tw`ml-2 text-sm text-gray-600 font-secret-medium`}>
          {post.votes}
        </Text>

        <Icon
          color={tw.color('gray-600')}
          name="comments"
          size={20}
          style={tw`ml-4`}
        />
        <Text style={tw`ml-2 text-sm text-gray-600 font-secret-medium`}>
          {post.comments}
        </Text>
      </View>
    </View>
  </Pressable>
)
