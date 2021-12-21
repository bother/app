import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import {
  ConversationCard,
  Loading,
  Oops,
  Refresher,
  Separator
} from '../components'
import { useConversations } from '../hooks'
import { ChatParamList } from '../navigators'

type Props = BottomTabScreenProps<ChatParamList, 'Conversations'>

export const Conversations: FunctionComponent<Props> = () => {
  const { conversations, error, loading, reload, reloading } =
    useConversations()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Oops
        label="Try again"
        message="Something went wrong."
        onPress={reload}
      />
    )
  }

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      data={conversations}
      refreshControl={<Refresher onRefresh={reload} refreshing={reloading} />}
      renderItem={({ item }) => <ConversationCard conversation={item} />}
    />
  )
}
