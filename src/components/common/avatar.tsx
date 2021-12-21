import React, { FunctionComponent } from 'react'
import { Pressable, StyleProp, View, ViewStyle } from 'react-native'
import Boring from 'react-native-boring-avatars'

import { useAuth } from '../../contexts'
import { useStartConversation } from '../../hooks'
import { isConversation, isPost, isProfile } from '../../lib'
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
  const sourceIsProfile = isProfile(source)

  const userId = sourceIsConversation
    ? user.id === source.members[0].userId
      ? source.members[1].userId
      : source.members[0].userId
    : sourceIsProfile
    ? source.id
    : source.userId

  const sourceId = sourceIsConversation
    ? source.commentId ?? source.postId
    : source.id

  const suffix = sourceIsConversation
    ? source.commentId
      ? 'comment'
      : 'post'
    : sourceIsProfile
    ? 'profile'
    : isPost(source)
    ? 'post'
    : 'comment'

  const me = userId === user.id

  return (
    <Pressable
      disabled={loading}
      onPress={() => {
        if (me || sourceIsProfile || sourceIsConversation || loading) {
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
            name={sourceIsProfile ? userId : `${userId}_${sourceId}_${suffix}`}
            size={size}
            square
            variant="beam"
          />
        </View>
      )}

      {me && !sourceIsProfile && (
        <View
          style={tw`absolute bottom-0 right-0 w-3 h-3 border rounded-full border-sky-400 bg-sky-600`}
        />
      )}
    </Pressable>
  )
}
