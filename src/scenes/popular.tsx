import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import React, { FunctionComponent } from 'react'

import { PostList } from '../components'
import { usePosts } from '../hooks'
import { FeedParamList } from '../navigators'

type Props = MaterialTopTabScreenProps<FeedParamList, 'Popular'>

export const Popular: FunctionComponent<Props> = () => {
  const data = usePosts('popular')

  return <PostList {...data} />
}
