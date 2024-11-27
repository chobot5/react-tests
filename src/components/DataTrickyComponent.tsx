import { useDataState } from '../lib/react/useDataState.ts'

export const DataTrickyComponent = () => {
  const data = useDataState()
  console.log('DataTrickyComponent', data)
  return <div>Tricky component: {data.length}</div>
}
