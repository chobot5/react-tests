import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  use,
  useState
} from 'react'

const ValueContext = createContext({
  count: 0,
  setCount: null as unknown as Dispatch<SetStateAction<number>>
})

const ValueContextProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0)

  return <ValueContext value={{ count, setCount }}>{children}</ValueContext>
}

const Count = () => {
  const { count, setCount } = use(ValueContext)

  return (
    <button type={'button'} onClick={() => setCount((v) => v + 1)}>
      {count}
    </button>
  )
}

export const NewReactContext = () => (
  <ValueContextProvider>
    <Count />
  </ValueContextProvider>
)
