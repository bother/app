import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'

import { tw } from '../../styles'
import { Profile } from '../../types'
import { Avatar } from '../common/avatar'

type Props = {
  profile: Profile
}

export const ProfileCard: FunctionComponent<Props> = ({ profile }) => (
  <View style={tw`flex-row items-center`}>
    <Avatar size={48} source={profile} />

    <View style={tw`ml-4`}>
      {profile.age && (
        <Text style={tw`text-base text-black font-bother-medium`}>
          {profile.age}
        </Text>
      )}

      {profile.gender && (
        <Text style={tw`text-base text-black font-bother-medium`}>
          {profile.gender}
        </Text>
      )}
    </View>
  </View>
)
