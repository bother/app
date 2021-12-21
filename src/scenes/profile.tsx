import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent, useState } from 'react'
import { LayoutAnimation, Pressable, View } from 'react-native'

import {
  Icon,
  Message,
  PostList,
  ProfileCard,
  ProfileEdit,
  Spinner
} from '../components'
import { useAuth } from '../contexts'
import { ProfileReturns, usePosts, useProfile } from '../hooks'
import { MainParamList } from '../navigators'
import { tw } from '../styles'

type Props = BottomTabScreenProps<MainParamList, 'Profile'>

export const Profile: FunctionComponent<Props> = () => {
  const { user } = useAuth()

  const profile = useProfile(user.id)
  const posts = usePosts('user')

  return <PostList header={<Main {...profile} />} {...posts} />
}

type MainProps = ProfileReturns

const Main: FunctionComponent<MainProps> = ({ error, loading, profile }) => {
  const [editing, setEditing] = useState(false)

  if (loading) {
    return <Spinner style={tw`m-4`} />
  }

  if (error) {
    return <Message message={error} style={tw`m-4`} type="error" />
  }

  if (editing) {
    return (
      <ProfileEdit
        onClose={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

          setEditing(false)
        }}
        profile={profile}
      />
    )
  }

  return (
    <View style={tw`flex-row justify-between bg-primary-100`}>
      <ProfileCard profile={profile} />

      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

          setEditing(true)
        }}
        style={tw`justify-center px-4`}>
        <Icon name="edit" size={20} />
      </Pressable>
    </View>
  )
}
