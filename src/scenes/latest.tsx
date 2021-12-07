import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Oops, PostCard, Separator } from '../components'
import { usePosts } from '../hooks'
import { FeedParamList } from '../navigators'

type Props = MaterialTopTabScreenProps<FeedParamList, 'Latest'>

export const Latest: FunctionComponent<Props> = () => {
  const { error, posts, reload } = usePosts('latest')

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={
        error ? <Oops label="Reload" message={error} onPress={reload} /> : null
      }
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  )
}
