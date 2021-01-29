export interface User {
  name: string
  token: string
  lastCommutedAt: string
  latLng: LatLng
  lastLocatedAt?: string
  lastWorkType: 0 | 1
}

export interface LatLng {
  latitude: number
  longitude: number
}
