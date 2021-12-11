import React, { FunctionComponent, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useCreateComment, useKeyboard } from '../../hooks'
import { tw } from '../../styles'
import { Post } from '../../types'
import { Spinner } from '../common/spinner'
import { TextBox } from '../common/text-box'

type Props = {
  post: Post

  reload: () => void
}

export const AddComment: FunctionComponent<Props> = ({ post, reload }) => {
  const { bottom } = useSafeAreaInsets()

  const keyboard = useKeyboard('will')

  const { createComment, loading } = useCreateComment(post.id, reload)

  const [body, setBody] = useState('')

  return (
    <View style={tw`flex-row items-start border-t border-gray-300`}>
      <TextBox
        editable={!loading}
        onChangeText={(body) => setBody(body)}
        onSubmitEditing={async () => {
          await createComment(body)

          setBody('')
        }}
        placeholder="Say something nice"
        returnKeyType="send"
        style={[
          tw`flex-1 rounded-none bg-[transparent]`,
          {
            paddingBottom: (keyboard ? 0 : bottom) + 12
          }
        ]}
        value={body}
      />

      {loading && <Spinner style={tw`m-3`} />}
    </View>
  )
}
