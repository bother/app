import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { Pressable, Text, View } from 'react-native'

import { useUpdateProfile } from '../../hooks'
import { tw } from '../../styles'
import { Profile, SupabaseProfileGender } from '../../types'
import { Message } from '../common/message'
import { TextBox } from '../common/text-box'

type Props = {
  profile: Profile

  setLoading: (loading: boolean) => void
}

export type ProfileEditRef = {
  save: () => Promise<Profile>
}

export const ProfileEdit = forwardRef<ProfileEditRef, Props>(
  ({ profile, setLoading }, ref) => {
    const { error, loading, updateProfile } = useUpdateProfile()

    const [age, setAge] = useState<number>(profile.age)
    const [gender, setGender] = useState<SupabaseProfileGender>(profile.gender)

    useEffect(() => {
      setLoading(loading)
    }, [loading, setLoading])

    useImperativeHandle(ref, () => ({
      save: () =>
        updateProfile({
          age,
          gender
        })
    }))

    const genders: Array<SupabaseProfileGender> = ['female', 'male', 'other']

    return (
      <>
        {!!error && <Message message={error} style={tw`mb-4`} type="error" />}

        <Text style={tw`text-lg text-gray-600 font-bother-medium`}>Age</Text>
        <TextBox
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={(age) => setAge(Number(age.replace(/[^\d]/g, '')))}
          placeholder="Age"
          style={tw`mt-2 bg-white`}
          value={age !== undefined ? String(age) : null}
        />

        <Text style={tw`mt-4 text-lg text-gray-600 font-bother-medium`}>
          Gender
        </Text>
        <View style={tw`flex-row mt-2 overflow-hidden rounded-lg`}>
          {genders.map((item) => (
            <Pressable
              key={item}
              onPress={() => setGender(item)}
              style={tw.style(
                'p-3 flex-1',
                item === gender ? 'bg-primary-600' : 'bg-white'
              )}>
              <Text
                style={tw.style(
                  'text-base font-bother-medium leading-tight text-center',
                  item === gender ? 'text-white' : 'text-black'
                )}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </>
    )
  }
)
