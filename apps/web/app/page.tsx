'use client'

import { Button } from '@foleon/ui'
import styles from './page.module.css'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { retriveToken } from '@/services/auth'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const mutation = useMutation(retriveToken, {
    onSuccess: () => router.push('/dashboard'),
  })

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Image src="/logo.svg" width={130} height={38} alt="Logo" />
          <Button label={'Login'} onClick={mutation.mutate} />
        </div>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Hey there! 👋</h1>
        <Button label={'Login to continue'} onClick={mutation.mutate} />
      </main>
    </>
  )
}
