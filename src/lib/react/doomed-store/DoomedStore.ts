type Listener<T> = (state: T) => void

export class DoomedStore<T> {
  private listeners: Set<Listener<T>>

  constructor(private state: T) {
    this.listeners = new Set<Listener<T>>()
    this.getState = this.getState.bind(this)
    this.subscribe = this.subscribe.bind(this)
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  setState(newState: T) {
    this.state = newState
    this.listeners.forEach((listener) => listener(this.state))
  }

  getState<R>(selector: (state: T) => R = (v: T) => v as unknown as R) {
    return selector(this.state)
  }
}
