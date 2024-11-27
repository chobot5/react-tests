import { useCallback, useState } from 'react'

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

type Handlers<Value extends Record<PropertyKey, any>> = {
  [K in keyof Value as `set${Capitalize<string & K>}`]: (
    value: Value[K],
    mapFunction?: (newValue: Value[K], state: Value) => Value[K]
  ) => void
}

export const useRecordState = <Value extends Record<PropertyKey, any>>(
  defaultValue: Value
): [Value, Handlers<Value>] => {
  const [state, setState] = useState(defaultValue)

  const createHandlers = useCallback(
    <Value extends Record<PropertyKey, any>>(
      record: Value
    ): Handlers<Value> => {
      const keys = Object.keys(record) as unknown as (keyof Value)[]

      return keys.reduce((acc, curr) => {
        return {
          ...acc,
          [`set${capitalize(curr.toString())}`]: (
            value: Value[keyof Value],
            mapFunction: (
              newValue: Value[keyof Value],
              state: Value
            ) => Value[keyof Value] = (newValue) => newValue
          ) =>
            setState((prev) => ({
              ...prev,
              [curr]: mapFunction ? mapFunction(value, prev) : value
            }))
        }
      }, {} as Handlers<Value>)
    },
    [defaultValue]
  )

  return [state, createHandlers(defaultValue)] as const
}
