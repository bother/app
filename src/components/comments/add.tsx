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
}

export const AddComment: FunctionComponent<Props> = ({ post }) => {
  const { bottom } = useSafeAreaInsets()

  const keyboard = useKeyboard('will')

  const { createComment, loading } = useCreateComment(post.id)

  const [body, setBody] = useState('')

  const padding = (keyboard ? 0 : bottom) + 12

  return (
    <View style={tw`flex-row items-start border-t border-gray-300`}>
      <TextBox
        editable={!loading}
        onChangeText={(body) => setBody(body)}
        onSubmitEditing={async () => {
          if (!body || loading) {
            return
          }

          const comment = await createComment({
            body
          })

          if (comment) {
            setBody('')
          }
        }}
        placeholder="Say something nice"
        returnKeyType="send"
        style={tw`flex-1 rounded-none bg-[transparent] pb-[${padding}px]`}
        value={body}
      />

      {loading && <Spinner style={tw`m-3`} />}
    </View>
  )
}
