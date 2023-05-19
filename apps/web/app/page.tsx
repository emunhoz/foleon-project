'use client'

import { useAuth } from '@/context/auth-context'
import { Button } from '@foleon/ui'
import styles from './page.module.css'
import Image from 'next/image'

export default function Home() {
  const { login } = useAuth()

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Image src="/logo.svg" width={130} height={38} alt="Logo" />
          <Button label={'Login'} onClick={login} />
        </div>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Hey there! 👋</h1>
        <Button label={'Login to continue'} onClick={login} />
      </main>
    </>
  )
}
