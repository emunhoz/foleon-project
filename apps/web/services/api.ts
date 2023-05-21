import axios from 'axios'
import { getCookie, deleteCookie } from 'cookies-next'

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
    if (error.response.status === 401 || error.response.status === 403) {
      deleteCookie('@foleon:token')
    }

    return Promise.reject(error)
  }
)

export { HTTP_CLIENT }