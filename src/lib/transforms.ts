import { formatISO, parseISO } from 'date-fns'
import groupBy from 'lodash/groupBy'
import { SectionListData } from 'react-native'

import {
  Comment,
  Conversation,
  ConversationMember,
  Message,
  Post,
  SupabaseComment,
  SupabaseConversationMemberWithProfile,
  SupabaseConversationWithData,
  SupabaseFeedPost,
  SupabaseMessage
} from '../types'

export const transformPost = ({
  body,
  comments,
  created_at,
  id,
  latitude,
  longitude,
  user_id,
  votes
}: SupabaseFeedPost): Post => ({
  body,
  comments,
  coordinates: {
    latitude: latitude,
    longitude: longitude
  },
  createdAt: parseISO(created_at),
  id,
  userId: user_id,
  votes
})

export const transformComment = ({
  body,
  created_at,
  id,
  post_id,
  user_id
}: SupabaseComment): Comment => ({
  body,
  createdAt: parseISO(created_at),
  id,
  postId: post_id,
  userId: user_id
})

export const transformConversation = ({
  comment_id,
  conversation_members,
  created_at,
  id,
  messages,
  post_id,
  updated_at
}: SupabaseConversationWithData): Conversation => ({
  commentId: comment_id,
  createdAt: parseISO(created_at),
  id,
  last: messages.length > 0 ? transformMessage(messages[0]) : undefined,
  members: conversation_members.map(transformConversationMember),
  postId: post_id,
  updatedAt: parseISO(updated_at)
})

export const transformConversationMember = ({
  created_at,
  id,
  last_seen,
  profile,
  user_id
}: SupabaseConversationMemberWithProfile): ConversationMember => ({
  createdAt: parseISO(created_at),
  id,
  lastSeen: last_seen ? parseISO(last_seen) : undefined,
  profile: {
    createdAt: parseISO(profile.created_at),
    ...profile
  },
  userId: user_id
})

export const transformMessage = ({
  attachment,
  body,
  conversation_id,
  created_at,
  id,
  user_id
}: SupabaseMessage): Message => ({
  attachment,
  body,
  conversationId: conversation_id,
  createdAt: parseISO(created_at),
  id,
  userId: user_id
})

export const transformMessagesIntoSections = (
  messages: Array<Message>
): Array<SectionListData<Message>> => {
  const groups = groupBy(messages, ({ createdAt }) =>
    formatISO(createdAt, {
      representation: 'date'
    })
  )

  return Object.entries(groups).map(([date, messages]) => ({
    data: messages,
    key: date
  }))
}
