import { Point } from './location'

// tables

export type SupabaseProfile = {
  id: string
  age?: number
  gender?: SupabaseProfileGender
  created_at: string
}

export type SupabasePost = {
  id: number
  user_id: string
  body: string
  location: string | Point
  created_at: string
}

export type SupabaseVote = {
  user_id: string
  post_id: string
  vote: string
  created_at: string
  updated_at: string
}

export type SupabaseComment = {
  id: number
  user_id: string
  post_id: number
  body: string
  created_at: string
}

export type SupabaseConversation = {
  id: number
  post_id: number
  comment_id?: number
  created_at: string
  updated_at: string
}

export type SupabaseConversationMember = {
  id: number
  conversation_id: number
  user_id: string
  last_seen?: string
  created_at: string
}

export type SupabaseMessage = {
  id: number
  conversation_id: number
  user_id: string
  body: string
  attachment?: unknown
  created_at: string
}

// functions

export type SupabaseFeedPost = {
  id: number
  user_id: string
  body: string
  comments: number
  votes: number
  latitude: number
  longitude: number
  created_at: string
}

// types

export type SupabaseProfileGender = 'male' | 'female' | 'other'

export type SupabaseConversationWithData = SupabaseConversation & {
  conversation_members: Array<SupabaseConversationMemberWithProfile>
  messages: Array<SupabaseMessage>
}

export type SupabaseConversationMemberWithProfile =
  SupabaseConversationMember & {
    profile: SupabaseProfile
  }
