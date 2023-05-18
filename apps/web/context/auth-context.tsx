'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { setCookie, deleteCookie, getCookie } from 'cookies-next'
import { retriveToken } from '@/services/auth'

interface AuthContextData {
  login: any
  logout: any
  isLogged: any
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthContextProvider = ({ children }: any) => {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const navigate = useRouter()

  console.log(!!getCookie('@foleon:token'), "!!getCookie('@foleon:token')")

  useEffect(() => {
    if (!!getCookie('@foleon:token')) {
      navigate.push('/dashboard')
      setIsLogged(true)
    }

    return () => {
      setIsLogged(false)
    }
  }, [])

  const login = async () => {
    const authUser: any = await retriveToken()

    setCookie('@foleon:token', authUser.data.access_token)
    navigate.push('/dashboard')
  }

  const logout = async () => {
    deleteCookie('@foleon:token')
    navigate.push('/')
  }

  return (
    <AuthContext.Provider value={{ login, logout, isLogged }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an UserProvider.')
  }

  return context
}

export { AuthContextProvider, useAuth }
