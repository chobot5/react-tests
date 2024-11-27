import { useDataStateChange } from '../lib/react/useDataStateChange.ts'

export const NestedComponent = () => {
  const { addItem, removeItem } = useDataStateChange()

  return (
    <div>
      <button type={'button'} onClick={() => addItem('val')}>
        add
      </button>
      <button type={'button'} onClick={() => removeItem('1')}>
        remove
      </button>
    </div>
  )
}
