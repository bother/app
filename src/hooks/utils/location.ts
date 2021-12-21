import * as Location from 'expo-location'
import { useQuery } from 'react-query'

import { Coordinates } from '../../types'

type Returns = {
  coordinates?: Coordinates
  error?: string
  loading: boolean
  reloading: boolean

  refetch: () => void
}

export const useLocation = (): Returns => {
  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Coordinates,
    Error
  >('location', async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== Location.PermissionStatus.GRANTED) {
      throw new Error('Permission denied')
    }

    const {
      coords: { latitude, longitude }
    } = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.Low
    })

    return {
      latitude,
      longitude
    }
  })

  return {
    coordinates: data,
    error: error?.message,
    loading: isLoading,
    refetch,
    reloading: isRefetching
  }
}
