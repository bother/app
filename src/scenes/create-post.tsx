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
          icon="plus"
          loading={loading}
          onPress={async () => {
            if (!body) {
              return
            }

            const post = await createPost(body)

            navigation.navigate('Post', {
              id: post.id
            })
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
        style={tw`flex-1`}
        value={body}
      />

      <View
        pointerEvents="none"
        style={tw.style(
          'absolute p-2 rounded-lg bottom-8 right-8',
          body.length > POST_MAX_LENGTH && 'bg-rose-600',
          body.length < POST_MIN_LENGTH && 'bg-amber-600',
          body.length >= POST_MIN_LENGTH &&
            body.length <= POST_MAX_LENGTH &&
            'bg-emerald-600'
        )}>
        <Text style={tw`text-sm leading-tight text-white font-secret-medium`}>
          {body.length} / {POST_MAX_LENGTH}
        </Text>
      </View>
    </View>
  )
}
