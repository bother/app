import { Coordinates } from './location'
import { SupabaseProfileGender } from './supabase'

export type Profile = {
  id: string
  age?: number
  gender?: SupabaseProfileGender
  createdAt: Date
}

export type Post = {
  id: number
  userId: string
  body: string
  votes: number
  comments: number
  coordinates: Coordinates
  createdAt: Date
}

export type Vote = {
  userId: string
  postId: string
  vote: number
  createdAt: Date
  updatedAt: Date
}

export type Comment = {
  id: number
  userId: string
  postId: number
  body: string
  createdAt: Date
}

export type Conversation = {
  id: number
  postId: number
  commentId?: number
  last?: Message
  members: Array<ConversationMember>
  createdAt: Date
  updatedAt: Date
}

export type ConversationMember = {
  id: number
  userId: string
  profile: Profile
  lastSeen?: Date
  createdAt: Date
}

export type Message = {
  id: number
  conversationId: number
  userId: string
  body: string
  attachment?: unknown
  createdAt: Date
}
