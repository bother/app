import React, { FunctionComponent } from 'react'
import { FlatList, FlatListProps } from 'react-native'

import { PostsReturns } from '../../hooks'
import { tw } from '../../styles'
import { Post } from '../../types'
import { Loading } from '../common/loading'
import { Oops } from '../common/oops'
import { Refresher } from '../common/refresher'
import { Separator } from '../common/separator'
import { PostCard } from './card'

type Props = PostsReturns & {
  header?: FlatListProps<Post>['ListHeaderComponent']
}

export const PostList: FunctionComponent<Props> = ({
  error,
  header,
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
      ListHeaderComponent={header}
      contentContainerStyle={tw`flex-grow`}
      data={posts}
      refreshControl={<Refresher onRefresh={reload} refreshing={reloading} />}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  )
}
