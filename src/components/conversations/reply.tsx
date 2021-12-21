import React, { FunctionComponent, useState } from 'react'
import { View } from 'react-native'

import { useSendMessage } from '../../hooks'
import { tw } from '../../styles'
import { Spinner } from '../common/spinner'
import { TextBox } from '../common/text-box'

type Props = {
  conversationId: number
}

export const ChatReply: FunctionComponent<Props> = ({ conversationId }) => {
  const { loading, sendMessage } = useSendMessage(conversationId)

  const [body, setBody] = useState('')

  return (
    <View style={tw`flex-row items-start border-t border-gray-300`}>
      <TextBox
        blurOnSubmit={false}
        editable={!loading}
        onChangeText={(body) => setBody(body)}
        onSubmitEditing={async () => {
          if (!body) {
            return
          }

          const message = await sendMessage({
            body
          })

          if (message) {
            setBody('')
          }
        }}
        placeholder="Say something nice"
        returnKeyType="send"
        style={tw`flex-1 rounded-none bg-[transparent]`}
        value={body}
      />

      {loading && <Spinner style={tw`m-3`} />}
    </View>
  )
}
