'use client'

import { useEffect, useState } from 'react'
import { retriveAllProjects } from '@/services/projects'
import styles from './page.module.css'

export default function Dashboard() {
  const [projects, setProjects] = useState<any>([])

  useEffect(() => {
    fetchAllProjects()
  }, [])

  async function fetchAllProjects() {
    const resp: any = await retriveAllProjects()
    setProjects(resp.data)
    console.log(resp.data, 'all projects')
  }

  return (
    <main className={styles.main}>
      <ul>
        {projects?._embedded?.title.map((project: any) => (
          <li key={project.id}>Name: {project.name}</li>
        ))}
      </ul>
    </main>
  )
}
