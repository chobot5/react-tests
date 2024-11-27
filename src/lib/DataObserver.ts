type Listener = (result: Record<string, string>) => void

export class DataObserver {
  #listeners: Set<Listener>

  constructor() {
    this.#listeners = new Set()
  }

  subscribe(listener: Listener) {
    this.#listeners.add(listener)

    return () => {
      this.#listeners.delete(listener)
    }
  }

  onDataChange(data: Record<string, string>) {
    this.#notify(data)
  }

  #notify(result: Record<string, string>) {
    this.#listeners.forEach((listener) => listener(result))
  }
}
