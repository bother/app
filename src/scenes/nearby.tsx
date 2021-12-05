import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Oops, PostCard, Separator } from '../components'
import { usePosts } from '../hooks'
import { MainParamList } from '../navigators'
import { tw } from '../styles'

type Props = NativeStackScreenProps<MainParamList, 'Nearby'>

export const Nearby: FunctionComponent<Props> = () => {
  const { error, posts, reload } = usePosts('nearby')

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={
        error ? <Oops label="Reload" message={error} onPress={reload} /> : null
      }
      contentContainerStyle={tw`flex-grow `}
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  )
}
