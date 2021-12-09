import { convertDistance, getDistance } from 'geolib'

import { Coordinates, Post } from '../types'

export const getKm = (post: Post, coordinates: Coordinates): string =>
  `${Math.ceil(
    convertDistance(getDistance(post.coordinates, coordinates), 'km')
  )} km`
