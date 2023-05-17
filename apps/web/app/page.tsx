'use client'

import styles from './page.module.css'
import { useState } from 'react'
import { Button } from '@foleon/ui'
import { retriveToken } from '@/services/auth'
import { retriveAllProjects } from '@/services/projects'

export default function Home() {
  const [projects, setProjects] = useState<any>([])

  async function fetchToken() {
    const resp: { data: { access_token: string } } = await retriveToken()
    localStorage.setItem('@foleon:token', resp.data.access_token)
  }

  async function fetchAllProjects() {
    const resp: any = await retriveAllProjects()
    setProjects(resp.data)
    console.log(resp.data, 'all projects')
  }

  return (
    <main className={styles.main}>
      <Button onClick={fetchToken}>Login</Button>
      <Button onClick={fetchAllProjects}>Projects</Button>

      <ul>
        {projects?._embedded?.title.map((project: any) => (
          <li key={project.id}>Name: {project.name}</li>
        ))}
      </ul>
    </main>
  )
}
