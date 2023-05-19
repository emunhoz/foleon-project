import { toast } from 'react-hot-toast';
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

    toast.success('Welcome 👋', { duration: 4000 })

    return resp
  } catch (error) {
    return console.error(error)
  }
}
