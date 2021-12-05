import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Oops, PostCard, Separator } from '../components'
import { usePosts } from '../hooks'
import { MainParamList } from '../navigators'

type Props = NativeStackScreenProps<MainParamList, 'Latest'>

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
