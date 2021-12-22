import React, { FunctionComponent, ReactElement } from 'react'
import { FlatList } from 'react-native'

import { PostsReturns } from '../../hooks'
import { tw } from '../../styles'
import { Loading } from '../common/loading'
import { Oops } from '../common/oops'
import { Refresher } from '../common/refresher'
import { Separator } from '../common/separator'
import { PostCard } from './card'

type Props = PostsReturns & {
  header?: ReactElement
  label?: string
  message?: string

  onPress?: () => void
}

export const PostList: FunctionComponent<Props> = ({
  error,
  header,
  label,
  loading,
  message,
  onPress,
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
          label={label ?? 'Refresh'}
          message={error ?? message ?? 'Nothing here'}
          onPress={onPress ?? reload}
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
