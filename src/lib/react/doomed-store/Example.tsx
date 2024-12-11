import { PropsWithChildren, useEffect } from 'react'

import { createStore } from './createStore'

interface StoreValues {
  a: number
  b: number
}

const defaultValues: StoreValues = { a: 3, b: 1 }

const store = createStore(
  defaultValues,
  {
    propagateAsQueryParams: (state) => ({
      a: state.a.toString(),
      b: state.b.toString()
    }),
    useInitialQueryParams: (params) => ({
      a: Number(params.get('a')),
      b: Number(params.get('b'))
    })
  },
  (set) => ({
    incA: () => set((prev) => ({ ...prev, a: prev.a + 1 })),
    incB: () => set((prev) => ({ ...prev, b: prev.b + 1 })),
    incTimeout: (incBy: number) =>
      set((prev) => {
        return new Promise((resolve, reject) => {
          if (incBy < 10) {
            reject('fail')
          }
          return setTimeout(() => resolve({ ...prev, a: prev.a + incBy }), 1000)
        })
      })
  })
)

const Init = ({ a, b, children }: PropsWithChildren<StoreValues>) => {
  const { setInitialState } = store.useStoreActions()

  useEffect(() => {
    setInitialState({ a, b })
  }, [])

  console.log('Init')
  return children
}

const ExampleA = () => {
  const hu = store.useStoreData((v) => v.a)
  console.log('A', hu)
  return <div>A: {hu}</div>
}

const ExampleB = () => {
  console.log('B')
  return <div>bbb</div>
}

const ExampleC = () => {
  const actions = store.useStoreActions()

  return (
    <div>
      <button type={'button'} onClick={actions.incA}>
        inc A
      </button>
      <button type={'button'} onClick={actions.incB}>
        inc B
      </button>
      <button type={'button'} onClick={() => actions.incTimeout(10)}>
        inc timeout A + 10
      </button>
    </div>
  )
}

const ExampleD = () => {
  const b = store.useStoreData((v) => v.b)
  console.log('D - b', b)
  return <div>B: {b}</div>
}

export const Example = () => {
  return (
    <Init a={66} b={77}>
      <ExampleA />
      <ExampleB />
      <ExampleC />
      <ExampleD />
    </Init>
  )
}
