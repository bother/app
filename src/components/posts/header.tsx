import { useNavigation } from '@react-navigation/native'
import * as Sharing from 'expo-sharing'
import React, { FunctionComponent } from 'react'
import { Alert, View } from 'react-native'

import { URL } from '../../lib'
import { tw } from '../../styles'
import { HeaderButton } from '../common/header/button'

type Props = {
  id: number
}

export const PostHeader: FunctionComponent<Props> = ({ id }) => {
  const navigation = useNavigation()

  return (
    <View style={tw`flex-row bg-primary-600`}>
      <HeaderButton
        icon="close"
        onPress={navigation.goBack}
        style={tw`mr-auto`}
      />
      <HeaderButton
        icon="flag"
        onPress={() =>
          Alert.alert(
            'Reported',
            'Thank you for reporting this post and making our community better.'
          )
        }
      />
      <HeaderButton
        icon="share"
        onPress={async () => {
          const available = await Sharing.isAvailableAsync()

          if (available) {
            await Sharing.shareAsync(`${URL}/posts/${id}`)
          }
        }}
      />
    </View>
  )
}
