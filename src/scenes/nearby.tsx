import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import React, { FunctionComponent } from 'react'

import { Loading, Oops, PostList } from '../components'
import { useLocation, usePosts } from '../hooks'
import { FeedParamList } from '../navigators'
import { Coordinates } from '../types'

type Props = MaterialTopTabScreenProps<FeedParamList, 'Nearby'>

export const Nearby: FunctionComponent<Props> = () => {
  const { coordinates, error, loading, refetch, reloading } = useLocation()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Oops
        label="Try again"
        loading={reloading}
        message="We need access to your location to create a post."
        onPress={refetch}
      />
    )
  }

  return <Main coordinates={coordinates} />
}

type MainProps = {
  coordinates: Coordinates
}

const Main: FunctionComponent<MainProps> = ({ coordinates }) => {
  const data = usePosts('nearby', coordinates)

  return <PostList {...data} />
}
