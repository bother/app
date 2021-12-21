import { formatDistanceToNowStrict } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'

import { tw } from '../../styles'
import { Comment } from '../../types'
import { Avatar } from '../common/avatar'
import { Icon } from '../common/icon'

type Props = {
  comment: Comment
  style?: StyleProp<ViewStyle>
}

export const CommentCard: FunctionComponent<Props> = ({ comment, style }) => (
  <View style={[tw`flex-row items-center p-3`, style]}>
    <Avatar size={32} source={comment} />

    <View style={tw`flex-1 ml-3`}>
      <Text selectable style={tw`text-sm text-gray-800 font-bother-regular`}>
        {comment.body}
      </Text>

      <View style={tw`flex-row items-center mt-2`}>
        <Icon color={tw.color('gray-400')} name="clock" size={14} />
        <Text style={tw`ml-2 text-xs text-gray-400 font-bother-medium`}>
          {formatDistanceToNowStrict(comment.createdAt)}
        </Text>
      </View>
    </View>
  </View>
)
