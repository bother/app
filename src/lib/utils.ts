import { AvatarSource, Comment, Conversation, Post, Profile } from '../types'

export const isComment = (data: AvatarSource): data is Comment =>
  !isConversation(data) && !isPost(data)

export const isConversation = (data: AvatarSource): data is Conversation =>
  !!(data as Conversation).members

export const isPost = (data: AvatarSource): data is Post =>
  !!(data as Post).coordinates

export const isProfile = (data: AvatarSource): data is Profile =>
  !!(data as Profile).age ||
  !!(data as Profile).gender ||
  (!isComment(data) && !isConversation(data) && !isPost(data))
