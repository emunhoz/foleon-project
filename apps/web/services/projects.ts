import { HTTP_CLIENT } from './api'

export async function retriveAllProjects(pageNumber: number) {
  return await HTTP_CLIENT.get(`/v2/magazine/title`, {
    params: {
      page: pageNumber ?? 1,
      limit: 20,
      'order-by': [{
        field: 'name',
        type: 'field',
        direction: 'ASC'
      }]
    }
  })
}

export async function searchProjectsByName(name: string) {
  return await HTTP_CLIENT.get(`/v2/magazine/title`, {
    params: {
      page: 1,
      limit: 20,
      query: [{
        field: 'name',
        type: 'like',
        value: name
      }],
      'order-by': [{
        field: 'name',
        type: 'field',
        direction: 'ASC'
      }]
    }
  })
}
