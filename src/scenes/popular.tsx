import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { PostList } from '../components/posts'
import { usePopular } from '../hooks'
import { PostsParams } from '../navigators/posts'

interface Props {
  navigation: StackNavigationProp<PostsParams, 'Popular'>
  route: RouteProp<PostsParams, 'Popular'>
}

export const Popular: FunctionComponent<Props> = () => {
  const { fetchPosts, loading, posts, refetch } = usePopular()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return <PostList loading={loading} posts={posts} refetch={refetch} />
}
