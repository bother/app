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
import { tw } from '../styles'

type Props = BottomTabScreenProps<ChatParamList, 'Conversations'>

export const Conversations: FunctionComponent<Props> = () => {
  const { conversations, error, loading, reload, reloading } =
    useConversations()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Oops label="Refresh" message={error} onPress={reload} />
  }

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={
        <Oops
          icon="empty"
          message="You haven't started any conversations yet"
        />
      }
      contentContainerStyle={tw`flex-grow`}
      data={conversations}
      refreshControl={<Refresher onRefresh={reload} refreshing={reloading} />}
      renderItem={({ item }) => <ConversationCard conversation={item} />}
    />
  )
}
