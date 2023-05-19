'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import {
  ProjectDetailsProps,
  ProjectsProps,
  retriveProjectById,
} from '@/services/projects'
import Link from 'next/link'
import { militaryDate } from '@/adapters/mask/date'
import { EmptyState } from '@foleon/ui'
import { AxiosResponse } from 'axios'

interface PublicationPageParams {
  params: {
    id: number
  }
}

export default function PublicationInfoId({ params }: PublicationPageParams) {
  const [project, setProject] = useState<ProjectsProps>()

  useEffect(() => {
    async function fetchProject() {
      const resp: AxiosResponse<any> = await retriveProjectById(params.id)
      setProject(resp.data)
    }
    fetchProject()
  }, [])

  return (
    <>
      <div className={styles.pageTop}>
        <Link href="/dashboard">
          <svg
            fill="#fff"
            className={styles.icon}
            width="44px"
            height="44px"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Back</title>
            <path d="M48,256c0,114.87,93.13,208,208,208s208-93.13,208-208S370.87,48,256,48,48,141.13,48,256Zm212.65-91.36a16,16,0,0,1,.09,22.63L208.42,240H342a16,16,0,0,1,0,32H208.42l52.32,52.73A16,16,0,1,1,238,347.27l-79.39-80a16,16,0,0,1,0-22.54l79.39-80A16,16,0,0,1,260.65,164.64Z" />
          </svg>
        </Link>
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Project ID: {params.id}</h1>
        {project?._embedded && (
          <ul className={styles.list}>
            {project._embedded.edition.map((project: ProjectDetailsProps) => (
              <li className={styles.listItem} key={project.uid}>
                <div className={styles.listItemWrapper}>
                  <div className={styles.listItemWrapperLabel}>Category:</div>
                  <div className={styles.listItemWrapperValue}>
                    {project.category}
                  </div>
                </div>

                <div className={styles.listItemWrapper}>
                  <div className={styles.listItemWrapperLabel}>Created at:</div>
                  <div className={styles.listItemWrapperValue}>
                    {militaryDate(project.created_on)}
                  </div>
                </div>

                <div className={styles.listItemWrapper}>
                  <div className={styles.listItemWrapperLabel}>Status:</div>
                  <div className={styles.listItemWrapperValue}>
                    {project.status}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {project?._embedded?.edition.length === 0 && (
          <EmptyState title={`Project details not found!`} />
        )}
      </main>
    </>
  )
}
