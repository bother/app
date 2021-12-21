import React, { FunctionComponent } from 'react'
import { Pressable, StyleProp, View, ViewStyle } from 'react-native'
import Boring from 'react-native-boring-avatars'

import { useAuth } from '../../contexts'
import { useStartConversation } from '../../hooks'
import { isConversation, isPost } from '../../lib'
import { tw } from '../../styles'
import { AvatarSource } from '../../types'
import { Spinner } from './spinner'

type Props = {
  size?: number
  source: AvatarSource
  style?: StyleProp<ViewStyle>
}

export const Avatar: FunctionComponent<Props> = ({
  size = 24,
  source,
  style
}) => {
  const { user } = useAuth()
  const { loading, startConversation } = useStartConversation(source)

  const sourceIsConversation = isConversation(source)

  const userId = sourceIsConversation
    ? user.id === source.members[0].userId
      ? source.members[1].userId
      : source.members[0].userId
    : source.userId

  const sourceId = sourceIsConversation
    ? source.commentId ?? source.postId
    : source.id

  const suffix = sourceIsConversation
    ? source.commentId
      ? 'comment'
      : 'post'
    : isPost(source)
    ? 'post'
    : 'comment'

  const me = userId === user.id

  return (
    <Pressable
      disabled={loading}
      onPress={() => {
        if (me || sourceIsConversation) {
          return
        }

        startConversation()
      }}
      style={[
        tw`h-[${size}px] w-[${size}px] items-center rounded-full justify-center bg-primary-600`,
        style
      ]}>
      {loading ? (
        <Spinner color={tw.color('white')} />
      ) : (
        <View style={tw`overflow-hidden rounded-full`}>
          <Boring
            colors={[
              'amber',
              'blue',
              'cyan',
              'emerald',
              'fuchsia',
              'green',
              'indigo',
              'lime',
              'orange',
              'pink',
              'purple',
              'red',
              'rose',
              'sky',
              'teal',
              'violet',
              'yellow'
            ].map((name) => tw.color(`${name}-600`))}
            name={`${userId}_${sourceId}_${suffix}`}
            size={size}
            square
            variant="beam"
          />
        </View>
      )}

      {me && (
        <View
          style={tw`absolute bottom-0 right-0 w-3 h-3 border rounded-full border-primary-400 bg-primary-600`}
        />
      )}
    </Pressable>
  )
}
