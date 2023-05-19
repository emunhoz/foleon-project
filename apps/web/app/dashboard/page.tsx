'use client'

import { useEffect, useState } from 'react'
import {
  ProjectsProps,
  retriveAllProjects,
  searchProjectsByName,
} from '@/services/projects'
import { militaryDate } from '@/adapters/mask/date'
import styles from './page.module.css'
import { Button, EmptyState, ListItem, SearchBar } from '@foleon/ui'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/auth-context'
import Image from 'next/image'

export default function Dashboard() {
  const [projects, setProjects] = useState<ProjectsProps>()
  const [searchBy, setSearchBy] = useState<string>('')
  const { logout } = useAuth()

  useEffect(() => {
    fetchAllProjects(1)
  }, [])

  async function fetchAllProjects(pageNumber: number) {
    const loadingToast = toast.loading('Loading data...')
    try {
      const resp = await retriveAllProjects(pageNumber)
      setProjects(resp.data)
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      toast.dismiss(loadingToast)
    }
  }

  async function searchProducts(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.target as unknown as HTMLFormElement
    const formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries())

    if (formJson.searchList === '') return fetchAllProjects(1)
    setSearchBy(String(formJson.searchList))

    const loadingToast = toast.loading('Searching for name...')
    try {
      const resp = await searchProjectsByName(String(formJson.searchList))
      setProjects(resp.data)
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      toast.dismiss(loadingToast)
    }
  }

  return (
    <>
      <header className={styles.headerIntern}>
        <div className={styles.headerInternWrapper}>
          <Image src="/logo-min.svg" width={30} height={30} alt="Logo" />
          <Button label={'Logout'} onClick={logout} primary />
        </div>
      </header>
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
          <div>Total items: {projects?.total_items}</div>
          <div>Items per page: {projects?.count}</div>
        </div>

        <ul className={styles.list}>
          {projects?._embedded?.title?.map(
            (project: { id: number; name: string; created_on: Date }) => (
              <Link href={`/dashboard/${project.id}`} key={project.id}>
                <ListItem
                  name={project.name}
                  created_on={militaryDate(project.created_on)}
                />
              </Link>
            )
          )}
        </ul>

        {searchBy.length > 0 && projects?._embedded?.title?.length === 0 && (
          <EmptyState title={`Project ${searchBy} not found!`} />
        )}

        {projects && (
          <div className={styles.pagination}>
            <Button
              label="Previous page"
              disabled={projects.page <= 1}
              onClick={() => fetchAllProjects(projects.page - 1)}
            />

            <div className={styles.pageNumber}>
              {projects.page}/{projects.page_count}
            </div>

            <Button
              label="Next page"
              disabled={projects.page >= projects.page_count}
              onClick={() => fetchAllProjects(projects.page + 1)}
            />
          </div>
        )}
      </main>
    </>
  )
}
