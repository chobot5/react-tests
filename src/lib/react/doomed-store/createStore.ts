import { useSyncExternalStore } from 'react'
import { DoomedStore } from './DoomedStore'

type SetterResult<State> = State | Promise<State>

export type SetterFn<State> = (state: State) => SetterResult<State>

interface Actions<State> {
  [key: string]: (...args: any[]) => SetterResult<State>
}

interface DefaultActions<State> {
  setState: (state: State) => void
  setInitialState: (state: State) => void
}

interface CreateStoreResult<State, ActionsType extends Actions<State>> {
  useStoreData: <SelectorResult = State>(
    selector?: (values: State) => SelectorResult
  ) => SelectorResult
  useStoreActions: () => DefaultActions<State> & ActionsType
}

interface CreateStoreDefaultResult<State> {
  useStoreData: <SelectorResult = State>(
    selector?: (values: State) => SelectorResult
  ) => SelectorResult
  useStoreActions: () => DefaultActions<State>
}

const isPromise = <T>(value: T | Promise<T>): value is Promise<T> => {
  return value instanceof Promise
}

type QueryParamsSetFn<State> = (values: State) => Record<string, string>
type QueryParamsGetFn<State> = (params: URLSearchParams) => State

interface StoreOptions<State> {
  propagateAsQueryParams?: QueryParamsSetFn<State> | false | null
  useInitialQueryParams?: QueryParamsGetFn<State> | false | null
}

export function createStore<State>(
  initialState: State | null,
  options?: StoreOptions<State> | null
): CreateStoreDefaultResult<State>

export function createStore<State, ActionsType extends Actions<State>>(
  initialState: State | null,
  options?: StoreOptions<State> | null,
  actions?: (
    set: (setterFn: SetterFn<State>) => SetterResult<State>
  ) => ActionsType
): CreateStoreResult<State, ActionsType>

export function createStore<State, ActionsType extends Actions<State>>(
  initialState: State | null,
  options?: StoreOptions<State> | null,
  actions?: (
    set: (setterFn: SetterFn<State>) => SetterResult<State>
  ) => ActionsType
): CreateStoreResult<State, ActionsType> | CreateStoreDefaultResult<State> {
  const resolveInitialQueryParams = (
    getInitialQueryParams: QueryParamsGetFn<State>
  ) => {
    const queryParams = new URLSearchParams(window.location.search)
    return getInitialQueryParams(queryParams)
  }

  const store = new DoomedStore(
    (options?.useInitialQueryParams
      ? resolveInitialQueryParams(options.useInitialQueryParams)
      : initialState) as State
  )

  const defaultOptions: StoreOptions<State> = {
    propagateAsQueryParams: false,
    useInitialQueryParams: false
  }
  const usedOptions: StoreOptions<State> = {
    ...defaultOptions,
    ...(options ?? {})
  }

  const onStoreUpdate = (newState: State) => {
    if (usedOptions.propagateAsQueryParams) {
      const newParamsObject = usedOptions.propagateAsQueryParams(newState)
      const currentParams = new URLSearchParams(window.location.search)
      Object.entries(newParamsObject).forEach(([key, value]) => {
        currentParams.set(key, value)
      })

      window.history.replaceState(
        Object.fromEntries(currentParams),
        '',
        `${window.location.pathname}?${currentParams.toString()}`
      )
    }
  }

  const setFn = (setter: SetterFn<State>) => {
    const newState = setter(store.getState())
    if (isPromise(newState)) {
      newState.then((state) => {
        store.setState(state)
        onStoreUpdate(state)
      })

      return newState
    }

    onStoreUpdate(newState)
    store.setState(newState)
    return newState
  }

  return {
    useStoreData: <SelectorResult>(
      selector = (state: State) => state as unknown as SelectorResult
    ) => useSyncExternalStore(store.subscribe, () => store.getState(selector)),
    useStoreActions: () => {
      const setState = (state: State) => setFn(() => state)
      const setInitialState = (state: State) => setFn(() => state)

      if (!actions) {
        return { setState, setInitialState }
      }

      const definedActions = actions(setFn)

      return {
        ...definedActions,
        setState,
        setInitialState
      }
    }
  }
}
