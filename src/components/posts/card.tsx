import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'

import { useCreateConversation } from '../../hooks'
import { getKm } from '../../lib'
import { RootParamList } from '../../navigators'
import { useLocation } from '../../stores'
import { tw } from '../../styles'
import { Post } from '../../types'
import { Avatar } from '../common/avatar'
import { Icon } from '../common/icon'
import { Spinner } from '../common/spinner'

type Props = {
  post: Post
  unlink?: boolean
  style?: StyleProp<ViewStyle>
}

export const PostCard: FunctionComponent<Props> = ({ post, style, unlink }) => {
  const { navigate } = useNavigation<StackNavigationProp<RootParamList>>()

  const { createConversation, loading } = useCreateConversation('post', post)

  const [{ coordinates }] = useLocation()

  return (
    <Pressable
      onPress={() => {
        if (unlink) {
          return
        }

        navigate('Post', {
          id: post.id
        })
      }}
      style={[tw`flex-row items-center p-4`, style]}>
      <Pressable disabled={loading} onPress={() => createConversation()}>
        {loading ? (
          <View style={tw`items-center justify-center w-12 h-12`}>
            <Spinner />
          </View>
        ) : (
          <Avatar seed={`${post.id}_${post.userId}`} size={48} />
        )}
      </Pressable>

      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-base text-black font-bother-regular`}>
          {post.id} {post.body}
        </Text>

        <Text
          selectable
          style={tw`mt-4 text-base text-black font-bother-regular`}>
          {post.userId}
        </Text>

        <View style={tw`flex-row items-center mt-4`}>
          <Icon color={tw.color('gray-600')} name="clock" size={20} />
          <Text style={tw`ml-2 text-sm text-gray-600 font-bother-medium`}>
            {formatDistanceToNowStrict(parseISO(post.createdAt))}
          </Text>

          <Icon
            color={tw.color('gray-600')}
            name="thumb-up"
            size={20}
            style={tw`ml-4`}
          />
          <Text style={tw`ml-2 text-sm text-gray-600 font-bother-medium`}>
            {post.votes}
          </Text>

          <Icon
            color={tw.color('gray-600')}
            name="comments"
            size={20}
            style={tw`ml-4`}
          />
          <Text style={tw`ml-2 text-sm text-gray-600 font-bother-medium`}>
            {post.comments}
          </Text>

          {!!coordinates && (
            <>
              <Icon
                color={tw.color('gray-600')}
                name="marker"
                size={20}
                style={tw`ml-4`}
              />
              <Text style={tw`ml-2 text-sm text-gray-600 font-bother-medium`}>
                {getKm(post, coordinates)}
              </Text>
            </>
          )}
        </View>
      </View>
    </Pressable>
  )
}
