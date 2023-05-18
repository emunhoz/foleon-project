'use client'

import styles from './page.module.css'
import { useState } from 'react'
import { Button } from '@foleon/ui'
import { retriveToken } from '@/services/auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Home() {
  const [projects, setProjects] = useState<any>([])
  const router = useRouter()

  function handleLogin() {
    retriveToken()
    router.push('/dashboard')
  }

  return (
    <>
      <header className={styles.header}>
        <Image src="/logo.svg" width={130} height={38} alt="Logo" />
        <Button label={'Login'} onClick={handleLogin} />
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Hey there! 👋</h1>
        <Button label={'Login to continue'} onClick={handleLogin} />
      </main>
    </>
  )
}
