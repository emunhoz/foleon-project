import { HTTP_CLIENT } from './api'

export async function retriveToken() {
  return await HTTP_CLIENT.post('/oauth',
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: String(process.env.NEXT_PUBLIC_CLIENT_ID),
      client_secret: String(process.env.NEXT_PUBLIC_CLIENT_SECRET),
    })
  )
}
