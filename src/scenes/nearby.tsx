import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Loading, Oops, PostCard, Separator } from '../components'
import { usePosts } from '../hooks'
import { FeedParamList } from '../navigators'
import { useLocation } from '../stores'
import { tw } from '../styles'
import { Coordinates } from '../types'

type Props = MaterialTopTabScreenProps<FeedParamList, 'Nearby'>

export const Nearby: FunctionComponent<Props> = () => {
  const [{ coordinates, error, loading }, { fetch }] = useLocation()

  if (loading && !error) {
    return <Loading />
  }

  if (error) {
    return (
      <Oops
        label="Try again"
        loading={loading}
        message="We need access to your location to show you nearby posts."
        onPress={fetch}
      />
    )
  }

  return <List coordinates={coordinates} />
}

type ListProps = {
  coordinates: Coordinates
}

const List: FunctionComponent<ListProps> = ({ coordinates }) => {
  const { error, posts, reload } = usePosts('nearby', coordinates)

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={
        error ? <Oops label="Reload" message={error} onPress={reload} /> : null
      }
      contentContainerStyle={tw`flex-grow`}
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  )
}
