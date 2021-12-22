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
      <Text style={tw`text-base text-black font-bother-medium`}>
        {profile.age ?? 'No age'}
      </Text>

      <Text style={tw`text-base text-black font-bother-medium`}>
        {profile.gender ?? 'No gender'}
      </Text>
    </View>
  </View>
)
