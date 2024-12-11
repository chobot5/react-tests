import { useActionState, useRef, useState } from 'react'
import { NumberInput } from './NumberInput'
//import { useFormStatus } from 'react-dom'

interface FormState {
  name: string
}

export const NewReactForm = () => {
  //const { pending } = useFormStatus()
  const [numIn, setNumIn] = useState(66)
  const formRef = useRef<HTMLFormElement>(null)
  const [state, submitAction, isPending] = useActionState((state) => {
    async function increment(previousState: number) {
      console.log(
        Array.from(formRef.current?.elements ?? []).forEach((el: Element) => {
          if (el instanceof HTMLInputElement) {
            console.log(el.validity)
          }
        })
      )
      return previousState + 1
    }

    return increment(state)
  }, 0)

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()
        submitAction(e)
      }}
      noValidate
    >
      <p>E:{state}</p>
      <button type='button' onClick={() => setNumIn(numIn + 1)}>
        inc
      </button>
      <input
        defaultValue={'johnx'}
        type='text'
        name='name'
        maxLength={10}
        minLength={3}
        required
      />
      <NumberInput value={numIn} onChange={setNumIn} />
      <button
        type='submit'
        disabled={isPending}
        style={{ background: isPending ? 'red' : 'blue' }}
      >
        Submit
      </button>
    </form>
  )
}
