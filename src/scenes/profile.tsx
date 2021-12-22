import {
  BottomTabNavigationProp,
  BottomTabScreenProps
} from '@react-navigation/bottom-tabs'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

import {
  HeaderButton,
  Message,
  PostList,
  ProfileCard,
  ProfileEdit,
  ProfileEditRef,
  Spinner
} from '../components'
import { useAuth } from '../contexts'
import { ProfileReturns, useCopy, usePosts, useProfile } from '../hooks'
import { animate } from '../lib'
import { MainParamList } from '../navigators'
import { tw } from '../styles'

type Props = BottomTabScreenProps<MainParamList, 'Profile'>

export const Profile: FunctionComponent<Props> = ({ navigation }) => {
  const { user } = useAuth()

  const profile = useProfile(user.id)
  const posts = usePosts('user')

  return (
    <PostList
      header={<Main {...profile} navigation={navigation} />}
      {...posts}
    />
  )
}

type MainProps = ProfileReturns & {
  navigation: BottomTabNavigationProp<MainParamList, 'Profile'>
}

const Main: FunctionComponent<MainProps> = ({
  error,
  loading,
  navigation,
  profile
}) => {
  const [copied, copy] = useCopy()

  const edit = useRef<ProfileEditRef>()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <HeaderButton
            icon={editing ? 'save' : copied ? 'done' : 'copy'}
            loading={saving}
            onPress={async () => {
              if (editing) {
                await edit.current?.save()

                animate()

                setEditing(false)
              } else {
                copy(profile.id)
              }
            }}
          />
          <HeaderButton
            icon={editing ? 'close' : 'edit'}
            onPress={() => {
              animate()

              setEditing((editing) => !editing)
            }}
          />
        </>
      )
    })
  }, [copied, copy, editing, navigation, profile, saving])

  return (
    <View style={tw`p-4 border-b border-gray-200 bg-primary-100`}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message message={error} type="error" />
      ) : editing ? (
        <ProfileEdit
          profile={profile}
          ref={edit}
          setLoading={(loading) => setSaving(loading)}
        />
      ) : (
        <ProfileCard profile={profile} />
      )}
    </View>
  )
}
