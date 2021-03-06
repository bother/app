import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { last } from 'lodash'
import { useCallback } from 'react'

import { Post, QueryLatestArgs } from '../graphql/types'

const LATEST_POSTS = gql`
  query latest($before: String) {
    latest(before: $before) {
      id
      body
      comments
      liked
      likes
      location {
        city
        country
        state
      }
      user {
        id
      }
      views
      createdAt
    }
  }
`

interface QueryLatestPayload {
  latest: Post[]
}

export const useLatest = () => {
  const [fetchPosts, { data, fetchMore, loading, refetch }] = useLazyQuery<
    QueryLatestPayload,
    QueryLatestArgs
  >(LATEST_POSTS)

  const fetchNext = useCallback(
    () =>
      fetchMore({
        updateQuery: (previous: QueryLatestPayload, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previous
          }

          return {
            latest: [...previous.latest, ...fetchMoreResult.latest]
          }
        },
        variables: {
          before: last(data?.latest)?.createdAt
        }
      }),
    [data?.latest, fetchMore]
  )

  return {
    fetchNext,
    fetchPosts,
    loading,
    posts: data ? data.latest : [],
    refetch
  }
}
