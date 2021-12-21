import { useNavigation } from '@react-navigation/native'
import * as Sharing from 'expo-sharing'
import React, { FunctionComponent } from 'react'
import { Alert, Pressable, StyleProp, View, ViewStyle } from 'react-native'

import { URL } from '../../lib'
import { tw } from '../../styles'
import { IconName } from '../../types'
import { Icon } from '../common/icon'

type Props = {
  id: number
}

export const PostHeader: FunctionComponent<Props> = ({ id }) => {
  const navigation = useNavigation()

  return (
    <View style={tw`flex-row bg-primary-600`}>
      <PostHeaderButton
        icon="close"
        onPress={navigation.goBack}
        style={tw`mr-auto`}
      />
      <PostHeaderButton
        icon="flag"
        onPress={() =>
          Alert.alert(
            'Reported',
            'Thank you for reporting this post and making our community better.'
          )
        }
      />
      <PostHeaderButton
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

type HeaderButtonProps = {
  icon: IconName
  style?: StyleProp<ViewStyle>

  onPress: () => void
}

const PostHeaderButton: FunctionComponent<HeaderButtonProps> = ({
  icon,
  onPress,
  style
}) => (
  <Pressable onPress={onPress} style={[tw`p-3`, style]}>
    <Icon color={tw.color('white')} name={icon} size={20} />
  </Pressable>
)
