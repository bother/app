import React, { FunctionComponent, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

import { useUpdateProfile } from '../../hooks'
import { tw } from '../../styles'
import { Profile, SupabaseProfileGender } from '../../types'
import { Icon } from '../common/icon'
import { Message } from '../common/message'
import { Spinner } from '../common/spinner'
import { TextBox } from '../common/text-box'

type Props = {
  profile: Profile

  onClose: () => void
}

export const ProfileEdit: FunctionComponent<Props> = ({ onClose, profile }) => {
  const { error, loading, updateProfile } = useUpdateProfile()

  const [age, setAge] = useState<number>(profile.age)
  const [gender, setGender] = useState<SupabaseProfileGender>(profile.gender)

  const genders: Array<SupabaseProfileGender> = ['female', 'male', 'other']

  return (
    <View style={tw`flex-row justify-between bg-primary-100`}>
      <View style={tw`flex-1 p-4`}>
        {!!error && <Message message={error} style={tw`mb-4`} type="error" />}

        <Text style={tw`text-lg text-gray-600 font-bother-medium`}>Age</Text>
        <TextBox
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={(age) => setAge(Number(age.replace(/[^\d]/g, '')))}
          placeholder="Age"
          style={tw`w-32 mt-2 bg-white`}
          value={age !== undefined ? String(age) : null}
        />

        <Text style={tw`mt-4 text-lg text-gray-600 font-bother-medium`}>
          Gender
        </Text>
        <View style={tw`flex-row self-start mt-2 overflow-hidden rounded-lg`}>
          {genders.map((item) => (
            <Pressable
              key={item}
              onPress={() => setGender(item)}
              style={tw.style(
                'p-3',
                item === gender ? 'bg-primary-600' : 'bg-white'
              )}>
              <Text
                style={tw.style(
                  'text-base font-bother-medium leading-tight',
                  item === gender ? 'text-white' : 'text-black'
                )}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={tw`justify-center`}>
        <Pressable
          disabled={loading}
          onPress={async () => {
            const profile = await updateProfile({
              age,
              gender
            })

            if (profile) {
              onClose()
            }
          }}
          style={tw`justify-center p-4`}>
          {loading ? (
            <Spinner color={tw.color('black')} />
          ) : (
            <Icon name="save" size={20} />
          )}
        </Pressable>
        <Pressable
          disabled={loading}
          onPress={onClose}
          style={tw`justify-center p-4`}>
          <Icon name="close" size={20} />
        </Pressable>
      </View>
    </View>
  )
}
