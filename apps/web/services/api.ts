import axios from 'axios'

const HTTP_CLIENT = axios.create({
  baseURL: 'https://api.foleon.com'
})

HTTP_CLIENT.interceptors.request.use(
  config => {
    const token = localStorage.getItem('@foleon:token')

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
    if (error.response.status === 401) {
      localStorage.removeItem('@foleon:token')
    }
  }
)

export { HTTP_CLIENT }