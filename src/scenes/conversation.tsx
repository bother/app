import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Loading, MessageCard, Oops } from '../components'
import { useMessages } from '../hooks'
import { ConversationsParamList } from '../navigators'

type Props = BottomTabScreenProps<ConversationsParamList, 'Conversation'>

export const Conversation: FunctionComponent<Props> = ({ route }) => {
  const { error, loading, messages, reload } = useMessages(route.params.id)

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
      data={messages}
      inverted
      renderItem={({ item }) => <MessageCard message={item} />}
    />
  )
}
