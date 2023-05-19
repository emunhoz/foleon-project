import { HTTP_CLIENT } from './api'

export interface BaseFoleonApi {
  page: number;
  page_count: number
  total_items: number
  count: number
}

export interface ProjectTitleProps { 
  id: number;
  name: string;
  created_on: Date
}

export interface ProjectDetailsProps {
  uid: number
  category: string
  created_on: Date
  status: string
}

export interface ProjectsProps extends BaseFoleonApi {
  _embedded: {
    edition?: ProjectDetailsProps[];
    title?: ProjectTitleProps[]
  }
}

export async function retriveAllProjects(pageNumber: number) {
  return await HTTP_CLIENT.get<ProjectsProps>(`/v2/magazine/title`, {
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
  return await HTTP_CLIENT.get<ProjectsProps>(`/v2/magazine/edition`, {
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
  return await HTTP_CLIENT.get<ProjectsProps>(`/v2/magazine/title`, {
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
