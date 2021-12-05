export type SupabasePost = {
  id: number
  userId: string
  body: string
  createdAt: string

  votes: Array<{
    vote: number
  }>
  comments: Array<{
    id: number
  }>
}

export type SupabaseComment = {
  id: number
  postId: number
  userId: string
  body: string
  createdAt: string
}
