import { createContext, PropsWithChildren, useState } from 'react'
import { DataClient } from '../DataClient.ts'

export const DataContext = createContext<DataClient | null>(null)

interface DataProviderProps {
  dataClient: DataClient
}

export const DataProvider = ({
  children,
  dataClient
}: PropsWithChildren<DataProviderProps>) => {
  const [client] = useState(dataClient)

  return <DataContext.Provider value={client}>{children}</DataContext.Provider>
}
