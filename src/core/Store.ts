/* eslint-disable no-shadow */
import EventBus from './EventBus'
import set from '../utils/set'

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: Indexed = {}

  constructor() {
    super()
    this.state = {}
  }

  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value)
    this.emit(StoreEvents.Updated)
  }
}

export default new Store()
