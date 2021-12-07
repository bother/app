import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import { HeaderButton, Message, TextBox } from '../components'
import { useCreatePost } from '../hooks'
import { POST_MAX_LENGTH, POST_MIN_LENGTH } from '../lib'
import { MainParamList } from '../navigators'
import { tw } from '../styles'

type Props = BottomTabScreenProps<MainParamList, 'CreatePost'>

export const CreatePost: FunctionComponent<Props> = ({ navigation }) => {
  const { createPost, error, loading } = useCreatePost()

  const [body, setBody] = useState('')

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          icon="send"
          loading={loading}
          onPress={async () => {
            if (!body) {
              return
            }

            await createPost(body)

            setBody('')
          }}
        />
      )
    })
  }, [body, createPost, loading, navigation])

  return (
    <View style={tw`flex-1 p-4`}>
      {!!error && <Message message={error} style={tw`mb-4`} type="error" />}

      <TextBox
        multiline
        onChangeText={(body) => setBody(body)}
        placeholder={`Say something nice
        
Community rules:

- Be respectful
- No bullying
- No criminal behavior
- No racism, sexism, or hate speech of any kind`}
        style={tw`flex-1 rounded-b-none`}
        value={body}
      />

      <View
        style={tw.style(
          'p-3 items-center bg-gray-200 rounded-b-lg',
          body.length > POST_MAX_LENGTH && 'border-rose-600',
          body.length < POST_MIN_LENGTH && 'border-amber-600',
          body.length >= POST_MIN_LENGTH &&
            body.length <= POST_MAX_LENGTH &&
            'border-emerald-600'
        )}>
        <Text
          style={tw.style(
            'text-sm leading-tight font-secret-bold',
            body.length > POST_MAX_LENGTH && 'text-rose-600',
            body.length < POST_MIN_LENGTH && 'text-amber-600',
            body.length >= POST_MIN_LENGTH &&
              body.length <= POST_MAX_LENGTH &&
              'text-emerald-600'
          )}>
          {body.length} / {POST_MAX_LENGTH}
        </Text>
      </View>
    </View>
  )
}
