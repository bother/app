import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { formatDistanceToNow, isBefore } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { Pressable, Text, View } from 'react-native'

import { useAuth } from '../../contexts'
import { ChatParamList } from '../../navigators'
import { tw } from '../../styles'
import { Conversation } from '../../types'
import { Avatar } from '../common/avatar'

type Props = {
  conversation: Conversation
}

export const ConversationCard: FunctionComponent<Props> = ({
  conversation
}) => {
  const navigation = useNavigation<StackNavigationProp<ChatParamList>>()

  const { user } = useAuth()

  const unread = isBefore(
    conversation.updatedAt,
    conversation.members[0].userId === user.id
      ? conversation.members[0].lastSeen
      : conversation.members[1].lastSeen
  )

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Conversation', {
          id: conversation.id
        })
      }
      style={tw.style('flex-row items-center p-4', unread && 'bg-gray-100')}>
      <Avatar size={48} source={conversation} />

      <View style={tw`flex-1 ml-4`}>
        <Text
          numberOfLines={1}
          style={tw.style(
            'text-base font-bother-regular',
            conversation.last ? 'text-black' : 'text-gray-600'
          )}>
          {conversation.last?.body ?? 'Start your conversation'}
        </Text>

        <Text style={tw`mt-1 text-sm text-gray-400 font-bother-regular`}>
          {formatDistanceToNow(conversation.updatedAt, {
            addSuffix: true
          })}
        </Text>
      </View>
    </Pressable>
  )
}
