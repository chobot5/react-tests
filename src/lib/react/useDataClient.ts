import { useContext } from 'react'
import { DataContext } from './DataProvider.tsx'

export const useDataClient = () => {
  const client = useContext(DataContext)
  if (!client) throw new Error('data client missing')

  return client
}
