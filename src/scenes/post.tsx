import { StackScreenProps } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import {
  AddComment,
  CommentCard,
  Loading,
  Oops,
  PostCard,
  Separator
} from '../components'
import { useComments, usePost } from '../hooks'
import { RootParamList } from '../navigators'
import { tw } from '../styles'

type Props = StackScreenProps<RootParamList, 'Post'>

export const Post: FunctionComponent<Props> = ({ route: { params } }) => {
  const { post, ...postProps } = usePost(params.id)
  const { comments, ...commentsProps } = useComments(params.id)

  const error = postProps.error || commentsProps.error
  const loading = postProps.loading || commentsProps.loading

  const reload = () => {
    postProps.reload()
    commentsProps.reload()
  }

  if (!post || !comments) {
    return <Loading />
  }

  if (error) {
    return <Oops label="Reload" message={error} onPress={reload} />
  }

  return (
    <>
      <FlatList
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={
          <PostCard post={post} style={tw`border-b border-gray-200`} unlink />
        }
        data={comments}
        refreshing={loading}
        renderItem={({ item }) => <CommentCard comment={item} />}
        style={tw`flex-grow bg-white`}
      />

      <AddComment post={post} reload={commentsProps.reload} />
    </>
  )
}
