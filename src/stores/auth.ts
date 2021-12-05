import AsyncStorage from '@react-native-async-storage/async-storage'
import { Action, createHook, createStore } from 'react-sweet-state'

type State = {
  auth: boolean
  loading: boolean
}

const initialState: State = {
  auth: false,
  loading: true
}

type Actions = typeof actions

const actions = {
  init:
    (): Action<State> =>
    async ({ setState }) => {
      setState({
        loading: true
      })

      const token = await AsyncStorage.getItem('supabase.auth.token')

      setState({
        auth: !!token,
        loading: false
      })
    },
  signIn:
    (): Action<State> =>
    ({ setState }) => {
      setState({
        auth: true,
        loading: false
      })
    },
  signOut:
    (): Action<State> =>
    ({ setState }) => {
      setState({
        auth: false,
        loading: false
      })
    }
}

const store = createStore<State, Actions>({
  actions,
  initialState
})

export const useAuth = createHook(store)
