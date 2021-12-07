import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Oops, PostCard, Spinner } from '../components'
import { usePost } from '../hooks'
import { PostsParamList } from '../navigators'
import { tw } from '../styles'

type Props = BottomTabScreenProps<PostsParamList, 'Post'>

export const Post: FunctionComponent<Props> = ({ route: { params } }) => {
  const { error, loading, post, reload } = usePost(params.id)

  if (error) {
    return <Oops label="Reload" message={error} onPress={reload} />
  }

  return (
    <FlatList
      ListHeaderComponent={
        loading ? <Spinner style={tw`m-4`} /> : <PostCard post={post} unlink />
      }
      data={[]}
      refreshing={loading}
      renderItem={() => null}
    />
  )
}
