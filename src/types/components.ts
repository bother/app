import { icons as headerIcons } from '../components/common/header/icon'
import { icons } from '../components/common/icon'
import { Comment, Conversation, Post } from './models'

export type IconName = keyof typeof icons
export type HeaderIconName = keyof typeof headerIcons

export type MessageType = 'message' | 'error' | 'warning' | 'success'

export type AvatarSource = Comment | Conversation | Post
