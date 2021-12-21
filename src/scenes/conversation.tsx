import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent, useMemo } from 'react'
import { SectionList } from 'react-native'

import {
  ChatHeader,
  ChatReply,
  ChatSectionHeader,
  Loading,
  MessageCard,
  Oops,
  Refresher
} from '../components'
import { useMessages } from '../hooks'
import { transformMessagesIntoSections } from '../lib'
import { ChatParamList } from '../navigators'
import { tw } from '../styles'
import { Message } from '../types'

type Props = BottomTabScreenProps<ChatParamList, 'Conversation'>

export const Conversation: FunctionComponent<Props> = ({ route }) => {
  const { error, loading, messages, reload, reloading } = useMessages(
    route.params.id
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Oops label="Refresh" message={error} onPress={reload} />
  }

  return (
    <>
      <List
        conversationId={route.params.id}
        messages={messages}
        reload={reload}
        reloading={reloading}
      />

      <ChatReply conversationId={route.params.id} />
    </>
  )
}

type ListProps = {
  conversationId: number
  messages: Array<Message>
  reloading: boolean

  reload: () => void
}

const List: FunctionComponent<ListProps> = ({
  conversationId,
  messages,
  reload,
  reloading
}) => {
  const sections = useMemo(
    () => transformMessagesIntoSections(messages),
    [messages]
  )

  return (
    <SectionList
      ListFooterComponent={<ChatHeader conversationId={conversationId} />}
      contentContainerStyle={tw`flex-grow`}
      inverted
      keyboardShouldPersistTaps="handled"
      refreshControl={<Refresher onRefresh={reload} refreshing={reloading} />}
      renderItem={({ item }) => <MessageCard message={item} />}
      renderSectionFooter={({ section }) => (
        <ChatSectionHeader section={section} />
      )}
      sections={sections}
    />
  )
}
