import { setCookie, deleteCookie } from 'cookies-next'
import { HTTP_CLIENT } from './api'

export async function retriveToken() {
  try {
    const resp = await HTTP_CLIENT.post('/oauth',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: String(process.env.NEXT_PUBLIC_CLIENT_ID),
        client_secret: String(process.env.NEXT_PUBLIC_CLIENT_SECRET),
      })
    )

  setCookie('@foleon:token', resp.data.access_token)
  } catch (error) {
    deleteCookie('@foleon:token')
    return
  }
}
