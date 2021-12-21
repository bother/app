import { format } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { useAuth } from '../../contexts'
import { tw } from '../../styles'
import { Message } from '../../types'

type Props = {
  message: Message
}

export const MessageCard: FunctionComponent<Props> = ({ message }) => {
  const { user } = useAuth()

  const mine = message.userId === user.id

  return (
    <View
      style={tw.style(
        'm-3 items-center',
        mine ? 'flex-row-reverse' : 'flex-row'
      )}>
      <View
        style={tw.style(
          'max-w-[80%] px-3 py-2 rounded-t-xl',
          mine ? 'bg-primary-200 rounded-bl-xl' : 'bg-gray-200 rounded-br-xl'
        )}>
        <Text selectable style={tw`text-base text-black font-bother-regular`}>
          {message.body}
        </Text>
      </View>

      <Text style={tw`mx-2 text-xs text-gray-400 font-bother-mono`}>
        {format(message.createdAt, 'HH:ss')}
      </Text>
    </View>
  )
}
