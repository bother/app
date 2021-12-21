import { format, parseISO } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { SectionListData, Text, View } from 'react-native'

import { tw } from '../../styles'
import { Message } from '../../types'

type Props = {
  section: SectionListData<Message>
}

export const ChatSectionHeader: FunctionComponent<Props> = ({ section }) => (
  <View style={tw`p-3`}>
    <Text style={tw`text-xs text-center text-gray-400 font-bother-mono`}>
      {format(parseISO(section.key), 'PPP')}
    </Text>
  </View>
)
