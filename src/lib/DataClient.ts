import { DataObserver } from './DataObserver.ts'

export class DataClient {
  #data: Record<string, string>
  observer: DataObserver

  constructor(initData: Record<string, string>) {
    this.#data = initData
    this.observer = new DataObserver()
  }

  setData(key: string, value: string) {
    this.#data = { ...this.#data, [key]: value }
    this.observer.onDataChange(this.#data)
  }

  removeData(key: string) {
    this.#data = Object.keys(this.#data).reduce((acc, curr) => {
      if (curr !== key) {
        return { ...acc, [curr]: this.#data[curr] }
      }
      return acc
    }, {})
    this.observer.onDataChange(this.#data)
  }

  getData() {
    return this.#data
  }
}
