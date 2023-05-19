'use client'

import { useEffect, useState } from 'react'
import { retriveAllProjects, searchProjectsByName } from '@/services/projects'
import { militaryDate } from '@/adapters/mask/date'
import styles from './page.module.css'
import { Button, SearchBar } from '@foleon/ui'

export default function Dashboard() {
  const [projects, setProjects] = useState<any>([])

  useEffect(() => {
    fetchAllProjects(1)
  }, [])

  async function fetchAllProjects(pageNumber: number) {
    const resp: any = await retriveAllProjects(pageNumber)
    setProjects(resp.data)
  }

  async function searchProducts(e: {
    preventDefault: () => void
    target: any
  }) {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries())
    const resp: any = await searchProjectsByName(String(formJson.searchList))

    if (formJson.searchList === '') {
      fetchAllProjects(1)
    }

    setProjects(resp.data)
  }

  return (
    <main className={styles.main}>
      <div className={styles.searchBarItem}>
        <form onSubmit={searchProducts}>
          <SearchBar labelName="searchList" onChange={console.log} />
        </form>
      </div>
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

      <div className={styles.pagination}>
        <Button
          label="Previous page"
          disabled={projects.page === 1}
          onClick={() => fetchAllProjects(projects.page - 1)}
        />

        <Button
          label="Next page"
          disabled={projects.page === projects.page_count}
          onClick={() => fetchAllProjects(projects.page + 1)}
        />
      </div>
    </main>
  )
}
