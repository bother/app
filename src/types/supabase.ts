import { Point } from './location'

// tables

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
  target_type: 'comment' | 'post'
  target_id: number
  user_id: string
  recipient_id: number
  created_at: string
  updated_at: string
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

export type FeedPost = {
  id: number
  user_id: string
  body: string
  comments: number
  votes: number
  latitude: number
  longitude: number
  created_at: string
}
