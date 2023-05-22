import axios from 'axios'
import { getCookie, deleteCookie } from 'cookies-next'
import { toast } from 'react-hot-toast'

const HTTP_CLIENT = axios.create({
  baseURL: 'https://api.foleon.com'
})

HTTP_CLIENT.interceptors.request.use(
  config => {
    const token = getCookie('@foleon:token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

HTTP_CLIENT.interceptors.response.use(
  response => response,
  error => {
    toast.dismiss()
    if (error.response.status === 401 || error.response.status === 403) {
      toast.error('You need to login again')
      deleteCookie('@foleon:token')
    }

    return Promise.reject(error)
  }
)

export { HTTP_CLIENT }