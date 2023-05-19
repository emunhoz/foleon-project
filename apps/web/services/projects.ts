import { HTTP_CLIENT } from './api'

export type AllProjectsProps = {
  data: {
    projects: {
      _embedded: {
        title: [{
          name: string,
          id: number
          created_on: string
        }]
        }
      };
    page: number;
    page_count: number
  }
}

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

export async function retriveProjectById(projectId: number) {
  return await HTTP_CLIENT.get(`/v2/magazine/edition`, {
    params: {
      filter: [
        {
          field: 'title',
          type: 'eq',
          value: projectId
        }
      ]
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
