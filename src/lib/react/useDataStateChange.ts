import { useDataClient } from './useDataClient.ts'

let key = 0

export const useDataStateChange = () => {
  const client = useDataClient()

  const addItem = (item: string) => {
    key = key + 1
    client.setData(key.toString(), item)
  }

  const removeItem = (key: string) => {
    client.removeData(key)
  }

  return {
    addItem,
    removeItem
  }
}
