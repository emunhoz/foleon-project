'use client'

import { Suspense, useState } from 'react'
import { retriveAllProjects } from '@/services/projects'
import { militaryDate } from '@/adapters/mask/date'
import styles from './page.module.css'
import { Button, EmptyState, ListItem, SearchBar } from '@foleon/ui'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { logout } from '@/services/auth'
import { useRouter } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'

export default function Dashboard() {
  const [searchBy, setSearchBy] = useState<string>('')
  const [pageNumber, setPage] = useState<number>(1)

  const {
    isLoading,
    error,
    data: projects,
  } = useQuery({
    queryKey: ['allProjects', pageNumber, searchBy],
    queryFn: () => retriveAllProjects({ pageNumber, searchBy }),
    keepPreviousData: true,
    staleTime: 5000,
  })

  const router = useRouter()

  function handleLogout() {
    router.push('/')
    logout()
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as unknown as HTMLFormElement
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())

    setSearchBy(String(formJson.searchList))
  }

  if (error) return 'An error has occurred'

  return (
    <Suspense>
      <header className={styles.headerIntern}>
        <div className={styles.headerInternWrapper}>
          <Image src="/logo-min.svg" width={30} height={30} alt="Logo" />
          <Button label={'Logout'} onClick={handleLogout} primary />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.searchBarItem}>
          <form onSubmit={onSubmit}>
            <SearchBar
              labelName="searchList"
              placeholder="Your project name here..."
            />
          </form>
        </div>

        <div className={styles.paginationInfo}>
          <div>Total items: {projects?.data?.total_items}</div>
          <div>Items per page: {projects?.data?.count}</div>
        </div>

        {isLoading && (
          <div className={styles.loader}>
            <Skeleton
              borderRadius={16}
              count={20}
              baseColor="#1f252d"
              highlightColor="#283340"
              height={79}
            />
          </div>
        )}

        {!isLoading && (
          <>
            <ul className={styles.list}>
              {projects?.data?._embedded?.title?.map(
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

            {searchBy.length > 0 &&
              projects?.data?._embedded?.title?.length === 0 && (
                <EmptyState title={`Project ${searchBy} not found!`} />
              )}

            <div className={styles.pagination}>
              <Button
                label="Previous page"
                disabled={projects && projects?.data?.page <= 1}
                onClick={() => setPage(pageNumber - 1)}
              />

              <div className={styles.pageNumber}>
                {projects?.data?.page}/{projects?.data?.page_count}
              </div>

              <Button
                label="Next page"
                disabled={
                  projects && projects?.data?.page >= projects?.data.page_count
                }
                onClick={() => setPage(pageNumber + 1)}
              />
            </div>
          </>
        )}
      </main>
    </Suspense>
  )
}
