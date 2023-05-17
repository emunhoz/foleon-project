import { HTTP_CLIENT } from './api'

export async function retriveAllProjects() {
  return await HTTP_CLIENT.get(`/v2/magazine/title`, {
    params: {
      page: 1,
      limit: 20,
      'order-by': [{
        field: 'name',
        type: 'field',
        direction: 'ASC'
      }]
    }
  })
}
