import {
  BottomTabNavigationProp,
  BottomTabScreenProps
} from '@react-navigation/bottom-tabs'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { HeaderButton, Loading, Message, Oops, TextBox } from '../components'
import { useCreatePost, useLocation } from '../hooks'
import { POST_MAX_LENGTH, POST_MIN_LENGTH } from '../lib'
import { MainParamList } from '../navigators'
import { tw } from '../styles'
import { Coordinates } from '../types'

type Props = BottomTabScreenProps<MainParamList, 'CreatePost'>

export const CreatePost: FunctionComponent<Props> = ({ navigation }) => {
  const { coordinates, error, loading, refetch, reloading } = useLocation()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Oops
        label="Try again"
        loading={reloading}
        message="We need access to your location to create a post."
        onPress={refetch}
      />
    )
  }

  return <Main coordinates={coordinates} navigation={navigation} />
}

type MainProps = {
  coordinates: Coordinates
  navigation: BottomTabNavigationProp<MainParamList, 'CreatePost'>
}

const Main: FunctionComponent<MainProps> = ({ coordinates, navigation }) => {
  const { createPost, error, loading } = useCreatePost()

  const [body, setBody] = useState('')

  const tooShort = body.length < POST_MIN_LENGTH
  const tooLong = body.length > POST_MAX_LENGTH

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          icon="send"
          loading={loading}
          onPress={async () => {
            if (!body || tooShort || tooLong || loading) {
              return
            }

            const id = await createPost({
              body,
              coordinates
            })

            if (id !== undefined) {
              setBody('')
            }
          }}
        />
      )
    })
  }, [body, coordinates, createPost, loading, navigation, tooLong, tooShort])

  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 p-4`}
      keyboardShouldPersistTaps="handled">
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
          'items-center rounded-b-lg overflow-hidden bg-gray-200'
        )}>
        <View
          style={tw.style(
            `absolute top-0 bottom-0 left-0 bg-emerald-200 w-[${
              (body.length / POST_MAX_LENGTH) * 100
            }%]`,
            tooLong && 'bg-rose-200',
            tooShort && 'bg-amber-200'
          )}
        />
        <Text
          style={tw`m-3 text-sm leading-tight text-black font-bother-medium`}>
          {body.length} / {POST_MAX_LENGTH}
        </Text>
      </View>
    </ScrollView>
  )
}
