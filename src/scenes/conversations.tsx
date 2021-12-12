import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { ConversationCard, Loading, Oops, Separator } from '../components'
import { useConversations } from '../hooks'
import { ConversationsParamList } from '../navigators'

type Props = BottomTabScreenProps<ConversationsParamList, 'Conversations'>

export const Conversations: FunctionComponent<Props> = () => {
  const { conversations, error, loading, reload } = useConversations()

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
      renderItem={({ item }) => <ConversationCard conversation={item} />}
    />
  )
}
