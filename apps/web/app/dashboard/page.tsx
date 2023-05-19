'use client'

import { useEffect, useState } from 'react'
import {
  AllProjectsProps,
  retriveAllProjects,
  searchProjectsByName,
} from '@/services/projects'
import { militaryDate } from '@/adapters/mask/date'
import styles from './page.module.css'
import { Button, SearchBar } from '@foleon/ui'

export default function Dashboard() {
  const [projects, setProjects] = useState<any>([])

  useEffect(() => {
    fetchAllProjects(1)
  }, [])

  async function fetchAllProjects(pageNumber: number) {
    const resp: AllProjectsProps = await retriveAllProjects(pageNumber)
    setProjects(resp.data)
  }

  async function searchProducts(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.target as unknown as HTMLFormElement
    const formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries())
    const resp: AllProjectsProps = await searchProjectsByName(
      String(formJson.searchList)
    )

    if (formJson.searchList === '') {
      fetchAllProjects(1)
    }

    setProjects(resp.data)
  }

  return (
    <main className={styles.main}>
      <div className={styles.searchBarItem}>
        <form onSubmit={searchProducts}>
          <SearchBar labelName="searchList" />
        </form>
      </div>
      <ul className={styles.list}>
        {projects?._embedded?.title.map(
          (project: { id: number; name: string; created_on: Date }) => (
            <li className={styles.listItem} key={project.id}>
              <div className={styles.listItemTitle}>{project.name}</div>
              <small className={styles.listItemDate}>
                {militaryDate(project.created_on)}
              </small>
            </li>
          )
        )}
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
