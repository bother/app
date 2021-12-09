import { Coordinates } from './location'

export type Post = {
  id: number
  userId: string
  body: string
  votes: number
  comments: number
  coordinates: Coordinates
  createdAt: string
}

export type Vote = {
  userId: string
  postId: string
  vote: string
  createdAt: string
  updatedAt: string
}

export type Comment = {
  id: number
  userId: string
  postId: number
  body: string
  createdAt: string
}
