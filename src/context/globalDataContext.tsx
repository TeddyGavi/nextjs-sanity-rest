import { createContext, useContext, useState } from 'react'
import useSWR, { SWRResponse } from 'swr'

import { Link } from '~/lib/sanity.queries'
import { fetchSocialData } from '~/utils/socialData'
type Context = {
  data: {
    links: Link[]
  }
  error: Error | undefined
  isLoading: boolean
}
const socialDataContext = createContext<Context | null>(null)
const SocialDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading } = useSWR('/api/social', fetchSocialData)
  if (error) throw new Error('Issue fetching data, please try again')

  return (
    <socialDataContext.Provider value={{ data, error, isLoading }}>
      {children}
    </socialDataContext.Provider>
  )
}

const useDataContext = () => {
  const context = useContext(socialDataContext)

  if (!context)
    throw new Error('Context must be called from within the ContextProvider')

  return context
}

export { SocialDataProvider, useDataContext }
