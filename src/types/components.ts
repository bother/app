import { icons as headerIcons } from '../components/common/header/icon'
import { icons } from '../components/common/icon'
import { Comment, Conversation, Post, Profile } from './models'

export type IconName = keyof typeof icons
export type HeaderIconName = keyof typeof headerIcons

export type MessageType = 'message' | 'error' | 'warning' | 'success'

export type AvatarSource = Comment | Conversation | Post | Profile

export type FeedType = 'popular' | 'nearby' | 'latest' | 'user'
