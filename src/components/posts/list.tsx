import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { PostsReturns } from '../../hooks'
import { tw } from '../../styles'
import { Loading } from '../common/loading'
import { Oops } from '../common/oops'
import { Refresher } from '../common/refresher'
import { Separator } from '../common/separator'
import { PostCard } from './card'

type Props = PostsReturns

export const PostList: FunctionComponent<Props> = ({
  error,
  loading,
  posts,
  reload,
  reloading
}) => {
  if (loading) {
    return <Loading />
  }

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={
        <Oops
          icon={error ? 'error' : 'empty'}
          label="Refresh"
          message={error ?? 'Nothing here'}
          onPress={reload}
        />
      }
      contentContainerStyle={tw`flex-grow`}
      data={posts}
      refreshControl={<Refresher onRefresh={reload} refreshing={reloading} />}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  )
}
