export type Post = {
  id: number
  userId: string
  body: string
  votes: number
  comments: number
  createdAt: string
}

export type Comment = {
  id: number
  postId: number
  userId: string
  body: string
  createdAt: string
}
