import { LatLng, User } from '../models/types'

const BASE_URL = 'https://us-central1-mobedchulcheck.cloudfunctions.net'

const commonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const sendLocation = async (deviceToken: string | null, name: string, latLng: LatLng) => {
  if (!deviceToken) return
  try {
    await fetch(`${BASE_URL}/locationOn`, {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify({
        latLng,
        name,
        deviceToken
      })
    })
  } catch (e) {
    console.log(e)
  }
}

export const fetchMembers = async (): Promise<User[]> => {
  try {
    const rawRes = await fetch(`${BASE_URL}/members`, {
      method: 'GET',
      headers: commonHeaders,
    })
    const res = await rawRes.json()
    if (res.status !== 200) throw Error('Network Error')
    return res.data
  } catch (e) {
    console.log(e)
    return []
  }
}
