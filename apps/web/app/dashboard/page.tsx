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
import Link from 'next/link'

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
          <SearchBar
            labelName="searchList"
            placeholder="Your project name here..."
          />
        </form>
      </div>

      <div className={styles.paginationInfo}>
        <div>Total items: {projects.total_items}</div>
        <div>Items per page: {projects.count}</div>
      </div>

      <ul className={styles.list}>
        {projects?._embedded?.title.map(
          (project: { id: number; name: string; created_on: Date }) => (
            <Link href={`/dashboard/${project.id}`} key={project.id}>
              <li className={styles.listItem}>
                <svg
                  className={styles.listItemIcon}
                  width="38px"
                  height="38px"
                  viewBox="0 0 24 24"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.99958 20.0004L14.8686 11.1314C15.2646 10.7354 15.4627 10.5373 15.691 10.4632C15.8918 10.3979 16.1082 10.3979 16.309 10.4632C16.5373 10.5373 16.7354 10.7354 17.1314 11.1314L21.4053 15.4053M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="#1f252d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className={styles.listItemWrapper}>
                  <div className={styles.listItemWrapperItem}>
                    <div className={styles.listItemLabel}>Name</div>
                    <div className={styles.listItemTitle}>{project.name}</div>
                  </div>
                  <div>
                    <div className={styles.listItemLabel}>Created at</div>
                    <div className={styles.listItemDate}>
                      {militaryDate(project.created_on)}
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          )
        )}
      </ul>

      <div className={styles.pagination}>
        <Button
          label="Previous page"
          disabled={projects.page === 1}
          onClick={() => fetchAllProjects(projects.page - 1)}
        />

        <div className={styles.pageNumber}>
          {projects.page}/{projects.page_count}
        </div>

        <Button
          label="Next page"
          disabled={projects.page === projects.page_count}
          onClick={() => fetchAllProjects(projects.page + 1)}
        />
      </div>
    </main>
  )
}
