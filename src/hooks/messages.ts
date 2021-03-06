import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import update from 'immutability-helper'
import { useCallback } from 'react'

import {
  MutationCreateThreadArgs,
  MutationEndThreadArgs,
  QueryFindThreadArgs,
  QueryThreadArgs,
  Thread
} from '../graphql/types'

export const THREADS = gql`
  query threads {
    threads {
      id
      ended
      last {
        id
        body
        user {
          id
        }
        createdAt
      }
      post {
        id
      }
      receiver {
        id
      }
      sender {
        id
      }
      createdAt
      updatedAt
    }
  }
`

export interface QueryThreadsPayload {
  threads: Thread[]
}

const THREAD = gql`
  query thread($id: String!) {
    thread(id: $id) {
      id
      ended
      last {
        id
        body
        user {
          id
        }
        createdAt
      }
      post {
        id
      }
      receiver {
        id
      }
      sender {
        id
      }
      createdAt
      updatedAt
    }
  }
`

interface QueryThreadPayload {
  thread: Thread
}

const FIND_THREAD = gql`
  query findThread($postId: String!) {
    findThread(postId: $postId) {
      id
      ended
      last {
        id
        body
        user {
          id
        }
        createdAt
      }
      post {
        id
      }
      receiver {
        id
      }
      sender {
        id
      }
      createdAt
      updatedAt
    }
  }
`

interface QueryFindThreadPayload {
  findThread: Thread
}

const CREATE_THREAD = gql`
  mutation createThread($postId: String!, $body: String!) {
    createThread(postId: $postId, body: $body) {
      id
    }
  }
`

interface MutationCreateThreadPayload {
  createThread: Thread
}

export const END_THREAD = gql`
  mutation endThread($id: String!) {
    endThread(id: $id)
  }
`

export interface MutationEndThreadPayload {
  endThread: boolean
}

export const THREAD_UPDATED = gql`
  subscription threadUpdated {
    threadUpdated {
      id
      ended
      last {
        id
        body
        user {
          id
        }
        createdAt
      }
      post {
        id
      }
      receiver {
        id
      }
      sender {
        id
      }
      createdAt
      updatedAt
    }
  }
`

export interface SubscriptionThreadUpdatedPayload {
  threadUpdated: Thread
}

export const useThreads = () => {
  const { data, loading, refetch, subscribeToMore } = useQuery<
    QueryThreadsPayload
  >(THREADS)

  const subscribe = useCallback(
    () =>
      subscribeToMore<SubscriptionThreadUpdatedPayload>({
        document: THREAD_UPDATED,
        updateQuery(previous, next) {
          const thread = next.subscriptionData.data.threadUpdated

          const index = previous.threads.findIndex(({ id }) => id === thread.id)

          return update(previous, {
            threads: {
              [index]: {
                $set: thread
              }
            }
          })
        }
      }),
    [subscribeToMore]
  )

  return {
    loading,
    refetch,
    subscribe,
    threads: data ? data.threads : []
  }
}

export const useMessages = () => {
  const [fetchOne, fetchOneQuery] = useLazyQuery<
    QueryThreadPayload,
    QueryThreadArgs
  >(THREAD)

  const [findOne, findOneQuery] = useLazyQuery<
    QueryFindThreadPayload,
    QueryFindThreadArgs
  >(FIND_THREAD)

  const [create, createMutation] = useMutation<
    MutationCreateThreadPayload,
    MutationCreateThreadArgs
  >(CREATE_THREAD)

  const [end, endMutation] = useMutation<
    MutationEndThreadPayload,
    MutationEndThreadArgs
  >(END_THREAD)

  const fetchThread = useCallback(
    (id: string) =>
      fetchOne({
        variables: {
          id
        }
      }),
    [fetchOne]
  )

  const findThread = useCallback(
    (postId: string) =>
      findOne({
        variables: {
          postId
        }
      }),
    [findOne]
  )

  const createThread = useCallback(
    async (postId: string, body: string) => {
      const response = await create({
        variables: {
          body,
          postId
        }
      })

      return response.data?.createThread.id
    },
    [create]
  )

  const endThread = useCallback(
    (id: string, block: boolean) =>
      end({
        update(proxy) {
          const threads = proxy.readQuery<QueryThreadsPayload>({
            query: THREADS
          })

          if (!threads) {
            return
          }

          const index = threads.threads.findIndex((thread) => thread.id === id)

          if (index < 0) {
            return
          }

          proxy.writeQuery<QueryThreadsPayload>({
            data: update(threads, {
              threads: {
                [index]: {
                  ended: {
                    $set: true
                  }
                }
              }
            }),
            query: THREADS
          })
        },
        variables: {
          block,
          id
        }
      }),
    [end]
  )

  return {
    createThread,
    creating: createMutation.loading,
    endThread,
    ending: endMutation.loading,
    fetchThread,
    findThread,
    loading: fetchOneQuery.loading || findOneQuery.loading,
    thread: fetchOneQuery.data?.thread || findOneQuery.data?.findThread
  }
}
