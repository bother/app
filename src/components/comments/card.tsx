import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'

import { useCreateConversation } from '../../hooks'
import { tw } from '../../styles'
import { Comment } from '../../types'
import { Avatar } from '../common/avatar'
import { Icon } from '../common/icon'
import { Spinner } from '../common/spinner'

type Props = {
  comment: Comment
  style?: StyleProp<ViewStyle>
}

export const CommentCard: FunctionComponent<Props> = ({ comment, style }) => {
  const { createConversation, loading } = useCreateConversation(
    'comment',
    comment
  )

  return (
    <View style={[tw`flex-row items-center p-3`, style]}>
      <Pressable disabled={loading} onPress={() => createConversation()}>
        {loading ? (
          <View style={tw`items-center justify-center w-8 h-8`}>
            <Spinner />
          </View>
        ) : (
          <Avatar seed={`${comment.id}_${comment.userId}`} size={32} />
        )}
      </Pressable>

      <View style={tw`flex-1 ml-3`}>
        <Text style={tw`text-sm text-gray-800 font-bother-regular`}>
          {comment.body}
        </Text>

        <Text
          selectable
          style={tw`mt-4 text-base text-black font-bother-regular`}>
          {comment.userId}
        </Text>

        <View style={tw`flex-row items-center mt-2`}>
          <Icon color={tw.color('gray-400')} name="clock" size={14} />
          <Text style={tw`ml-2 text-xs text-gray-400 font-bother-medium`}>
            {formatDistanceToNowStrict(parseISO(comment.createdAt))}
          </Text>
        </View>
      </View>
    </View>
  )
}
