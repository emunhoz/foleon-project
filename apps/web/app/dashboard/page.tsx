'use client'

import { useEffect, useState } from 'react'
import { retriveAllProjects } from '@/services/projects'
import { militaryDate } from '@/adapters/mask/date'
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
      <ul className={styles.list}>
        {projects?._embedded?.title.map((project: any) => (
          <li className={styles.listItem} key={project.id}>
            <div className={styles.listItemTitle}>{project.name}</div>
            <small className={styles.listItemDate}>
              {militaryDate(project.created_on)}
            </small>
          </li>
        ))}
      </ul>
    </main>
  )
}
