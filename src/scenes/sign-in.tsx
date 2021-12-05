import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FunctionComponent, useCallback, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TextBox } from '../components'
import { Button, Message } from '../components'
import { supabase } from '../lib'
import { LandingParamList } from '../navigators'
import { tw } from '../styles'

type Props = NativeStackScreenProps<LandingParamList, 'SignIn'>

export const SignIn: FunctionComponent<Props> = () => {
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState<'sign-up' | 'sign-in'>()
  const [error, setError] = useState<string>()

  const submit = useCallback(
    async (action: 'sign-up' | 'sign-in') => {
      if (!email) {
        return emailRef.current?.focus()
      }

      if (!password) {
        return passwordRef.current?.focus()
      }

      try {
        setLoading(action)

        const method =
          action === 'sign-in' ? supabase.auth.signIn : supabase.auth.signUp

        const { error } = await method({
          email,
          password
        })

        if (error) {
          throw new Error(error.message)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(undefined)
      }
    },
    [email, password]
  )

  return (
    <SafeAreaView edges={['bottom']} style={tw`justify-end flex-1 m-4`}>
      {!!error && <Message message={error} style={tw`mb-4`} type="error" />}

      <TextBox
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(value) => setEmail(value)}
        onSubmitEditing={() => passwordRef.current?.focus()}
        placeholder="Email"
        ref={emailRef}
        returnKeyType="next"
      />
      <TextBox
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(value) => setPassword(value)}
        placeholder="Password"
        ref={passwordRef}
        returnKeyType="done"
        secureTextEntry
        style={tw`mt-4`}
      />

      <View style={tw`flex-row mt-4`}>
        <Button
          disabled={!!loading}
          loading={loading === 'sign-in'}
          onPress={() => submit('sign-in')}
          style={tw`flex-1`}
          title="Sign in"
        />
        <Button
          disabled={!!loading}
          loading={loading === 'sign-up'}
          onPress={() => submit('sign-up')}
          style={tw`flex-1 ml-4 bg-accent-600`}
          title="Sign up"
        />
      </View>
    </SafeAreaView>
  )
}
