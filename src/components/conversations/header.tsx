import React, { FunctionComponent, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { useQueryClient } from 'react-query'

import { useAuth } from '../../contexts'
import { useLocation, usePost } from '../../hooks'
import { getKm } from '../../lib'
import { tw } from '../../styles'
import { Conversation } from '../../types'
import { Avatar } from '../common/avatar'

type Props = {
  conversationId: number
}

export const ChatHeader: FunctionComponent<Props> = ({ conversationId }) => {
  const { user } = useAuth()

  const client = useQueryClient()

  const [conversation, setConversation] = useState<Conversation>()

  useEffect(() => {
    const conversations =
      client.getQueryData<Array<Conversation>>('conversations')

    const conversation = conversations.find(({ id }) => id === conversationId)

    setConversation(conversation)
  }, [client, conversationId])

  if (!conversation) {
    return null
  }

  const them =
    user.id === conversation.members[0].userId
      ? conversation.members[1]
      : conversation.members[0]

  return (
    <View style={tw`flex-row items-center justify-center p-3 bg-gray-100`}>
      <Avatar size={48} source={conversation} />

      <View style={tw`ml-4`}>
        {them.profile.age && (
          <Text style={tw`text-sm text-gray-400 font-bother-medium`}>
            {them.profile.age}
          </Text>
        )}

        {them.profile.gender && (
          <Text style={tw`text-sm text-gray-400 font-bother-medium`}>
            {them.profile.gender}
          </Text>
        )}

        <Distance postId={conversation.postId} />
      </View>
    </View>
  )
}

type DistanceProps = {
  postId: number
}

const Distance: FunctionComponent<DistanceProps> = ({ postId }) => {
  const { post } = usePost(postId)

  const { coordinates } = useLocation()

  if (!post || !coordinates) {
    return null
  }

  return (
    <Text style={tw`text-sm text-gray-400 font-bother-medium`}>
      {getKm(post, coordinates)}
    </Text>
  )
}
