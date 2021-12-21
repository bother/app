import { AvatarSource, Comment, Conversation, Post } from '../types'

export const isComment = (data: AvatarSource): data is Comment =>
  !isConversation(data) && !isPost(data)

export const isConversation = (data: AvatarSource): data is Conversation =>
  !!(data as Conversation).members

export const isPost = (data: AvatarSource): data is Post =>
  !!(data as Post).coordinates
