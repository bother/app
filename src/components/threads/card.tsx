import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Thread } from '../../graphql/types'
import { useAuth } from '../../store'
import { colors, layout, typography } from '../../styles'
import { Avatar } from '../avatar'
import { Touchable } from '../touchable'

interface Props {
  thread: Thread
}

export const ThreadCard: FunctionComponent<Props> = ({ thread }) => {
  const { navigate } = useNavigation()

  const [{ userId }] = useAuth()

  const time = moment(thread.updatedAt)

  const differenceInDays = moment().diff(time, 'days')
  const differenceInHours = moment().diff(time, 'hours')

  return (
    <Touchable
      onPress={() =>
        navigate('Thread', {
          id: thread.id
        })
      }
      style={[styles.main, thread.ended && styles.ended]}>
      <Avatar
        seed={
          (userId === thread.receiver.id
            ? thread.sender.id
            : thread.receiver.id) + thread.post.id
        }
      />
      <View style={styles.details}>
        <Text style={styles.body}>
          {thread.last.body.indexOf('image:') === 0
            ? 'Image'
            : thread.last.body}
        </Text>
        <Text style={styles.time}>
          {moment(thread.updatedAt).format(
            differenceInDays >= 7
              ? 'MMM D LT'
              : differenceInHours >= 24
              ? 'ddd LT'
              : 'LT'
          )}
        </Text>
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  body: {
    ...typography.regular,
    color: colors.foreground,
    lineHeight: typography.regular.fontSize * layout.lineHeight,
    marginBottom: 'auto'
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  ended: {
    opacity: 0.5
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: layout.radius * 2,
    flexDirection: 'row',
    marginHorizontal: layout.margin,
    padding: layout.margin
  },
  time: {
    ...typography.small,
    color: colors.foregroundLight,
    marginTop: layout.padding
  }
})
