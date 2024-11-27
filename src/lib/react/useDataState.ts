import { useDataClient } from './useDataClient.ts'
import { useCallback, useSyncExternalStore } from 'react'

export const useDataState = () => {
  const client = useDataClient()

  const data = useSyncExternalStore(
    useCallback(
      (onStoreChange: (result: Record<string, string>) => void) => {
        const unsubscribe = client.observer.subscribe(onStoreChange)
        return unsubscribe
      },
      [client.observer]
    ),
    () => {
      return client.getData()
    }
  )

  return data
}
