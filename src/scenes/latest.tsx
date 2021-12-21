import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import React, { FunctionComponent } from 'react'

import { PostList } from '../components'
import { usePosts } from '../hooks'
import { FeedParamList } from '../navigators'

type Props = MaterialTopTabScreenProps<FeedParamList, 'Latest'>

export const Latest: FunctionComponent<Props> = () => {
  const data = usePosts('latest')

  return <PostList {...data} />
}
