import { createContext, useContext, useState } from 'react'
type Context = {
  data?: number
  increment: () => void
}
const dataContext = createContext<Context | null>(null)
export const GlobalDataProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [data, setData] = useState(0)

  const increment = () => setData(data + 1)

  const value = { data, increment }
  return <dataContext.Provider value={value}>{children}</dataContext.Provider>
}

export const useXContext = () => {
  const context = useContext(dataContext)

  if (!context)
    throw new Error('XContext must be called from within the XContextProvider')

  return context
}
