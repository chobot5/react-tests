import { useRecordState } from './useRecordState.ts'
import { Suspense, useDeferredValue } from 'react'

import { memo } from 'react'

const SlowList = memo(function SlowList({ text }: { text: string }) {
  // Log once. The actual slowdown is inside SlowItem.
  console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />')

  let items = []
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />)
  }
  return <ul className='items'>{items}</ul>
})

function SlowItem({ text }: { text: string }) {
  let startTime = performance.now()
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className='item'>Text: {text}</li>
}

export const RecordStateTest = () => {
  const [someRecord, handlers] = useRecordState({ a: 1, b: '' })
  const deferredValue = useDeferredValue(someRecord.b)

  return (
    <div>
      <h1>RecordStateTest A {someRecord.a}</h1>
      <div>A: {someRecord.a}</div>
      <div>
        B: {someRecord.b} / {deferredValue}
      </div>
      <button
        type={'button'}
        onClick={() => {
          handlers.setA(++someRecord.a)
          handlers.setB(someRecord.b, (v, state) => {
            return (666 + someRecord.a).toString()
          })
        }}
      >
        click
      </button>
      <input
        type={'text'}
        value={someRecord.b}
        onChange={(e) => handlers.setB(e.target.value)}
      />
      <Suspense fallback={<div>loading...</div>}>
        <strong
          style={{
            opacity: someRecord.b !== deferredValue ? 0.5 : 1
          }}
        >
          <SlowList text={deferredValue} />
        </strong>
      </Suspense>
    </div>
  )
}
