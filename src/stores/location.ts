import * as Location from 'expo-location'
import { Action, createHook, createStore } from 'react-sweet-state'

import { Coordinates } from '../types/location'

type State = {
  coordinates?: Coordinates
  error?: string
  loading: boolean
}

const initialState: State = {
  loading: false
}

type Actions = typeof actions

const actions = {
  fetch:
    (): Action<State> =>
    async ({ setState }) => {
      try {
        setState({
          loading: true
        })

        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== Location.PermissionStatus.GRANTED) {
          throw new Error('Permission denied')
        }

        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.Low
        })

        setState({
          coordinates: {
            latitude: coords.latitude,
            longitude: coords.longitude
          },
          error: undefined
        })
      } catch (error) {
        setState({
          error: error.message
        })
      } finally {
        setState({
          loading: false
        })
      }
    }
}

const store = createStore<State, Actions>({
  actions,
  initialState
})

export const useLocation = createHook(store)
