import { Effect, Context, Layer, pipe } from 'effect'
import { objectKeys } from '@doomedpack/functions/object/objectKeys'

import { Maybe } from '@doomedpack/functions/types'
import { objectEntries } from '@doomedpack/functions/object/objectEntries'
import { append } from '@doomedpack/functions/array/append'
import { range } from '@doomedpack/functions/number/range'

console.log(objectKeys({ a: 1, b: 2 }), objectEntries({ a: 1, b: 2 }))

const x = range(1, 10)
console.log(x)

type A = Maybe<number>

const aaa = append(1)([1, 2, 3])

export class TestString extends Context.Tag('TestString')<
  TestString,
  { readonly getString: Effect.Effect<string> }
>() {}

export class TestNumber extends Context.Tag('TestNumber')<
  TestNumber,
  { readonly getNumber: Effect.Effect<number> }
>() {}

const TestStringLive = Layer.succeed(
  TestString,
  TestString.of({
    getString: Effect.succeed('tree')
  })
)

const TestNumberLive = Layer.effect(
  TestNumber,
  Effect.map(TestString, (testStringService) => {
    return {
      getNumber: Effect.map(testStringService.getString, (s) => s.length)
    }
  })
)

const MainLive = TestNumberLive.pipe(Layer.provide(TestStringLive))

const program = TestNumber.pipe(Effect.flatMap((a) => a.getNumber))
export const runnable = Effect.provide(program, MainLive)

export const lefu = Effect.runSync(
  Effect.succeed({ a: 3 }).pipe(
    Effect.filterOrElse(
      (hm) => hm.a > 10,
      () => Effect.succeed({ a: 3 })
    ),
    Effect.map((hm) => hm.a * 2),
    Effect.flatMap((hm) => (hm > 11 ? Effect.succeed(hm) : Effect.fail('666'))),
    Effect.merge,
    Effect.map((hm) => hm)
  )
)
