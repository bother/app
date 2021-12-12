import { format, parseISO } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { useUser } from '../../contexts'
import { tw } from '../../styles'
import { Message } from '../../types'

type Props = {
  message: Message
}

export const MessageCard: FunctionComponent<Props> = ({ message }) => {
  const { user } = useUser()

  const isMine = message.userId === user.id

  return (
    <View
      style={tw.style(
        'm-3 items-center',
        isMine ? 'flex-row-reverse' : 'flex-row'
      )}>
      <View
        style={tw.style(
          'max-w-[80%] flex-row p-3 rounded-3xl self-start',
          isMine ? 'bg-primary-600' : 'bg-gray-200'
        )}>
        <Text
          style={tw.style(
            'text-base font-bother-regular',
            isMine ? 'text-white' : 'text-black'
          )}>
          {message.body}
        </Text>
      </View>

      <Text style={tw`mx-2 text-sm text-gray-400 font-bother-regular`}>
        {format(parseISO(message.createdAt), 'hh:ss')}
      </Text>
    </View>
  )
}
