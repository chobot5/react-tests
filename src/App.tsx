import { DataClient } from './lib/DataClient'
import { DataProvider } from './lib/react/DataProvider'
import { DataComponent } from './components/DataComponent'
import { NestedComponent } from './components/NestedComponent'
import { DataTrickyComponent } from './components/DataTrickyComponent'
import { Effect } from 'effect'
import { lefu, runnable } from './effect/testService'
import { MotionAnimations } from './components/MotionAnimations'
import { Flow } from './flow/flow'
import { PrimeNumber } from './components/PrimeNumbers'
import { Branded } from './lib/Branded.ts'

type Email = Branded<string, 'Email'>

const validateEmail = (value: string): Email => {
  return value as Email
}

const x = new PrimeNumber(666)
const numbers: number[] = []
for (const i of x) {
  numbers.push(i)
}

console.log(
  'Flow result: ',
  Flow(1)
    .map((x) => x + 1)
    .map((x) => x.toString())
    .map((a) => a + 'b')
    .run()
)

const client = new DataClient({ a: 'a' })

function App() {
  return (
    <DataProvider dataClient={client}>
      {Effect.runSync(runnable)}
      <strong>{JSON.stringify(lefu)}</strong>
      <div>{numbers.join(', ')}</div>
      <DataComponent />
      <NestedComponent />
      <DataTrickyComponent />
      <MotionAnimations />
    </DataProvider>
  )
}

export default App
