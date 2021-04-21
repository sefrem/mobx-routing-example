import {makeAutoObservable,} from 'mobx'
import {fromPromise} from 'mobx-utils'

class Store {

  constructor() {
    makeAutoObservable(this)
  }

  currentView = {
    name: 'initial'
  };

  get currentPath() {
    switch (this.currentView.name) {
      case 'list':
        return '/list'
      case 'item':
        return `/item/${this.currentView.itemId}`

      default:
        return ''
    }
  }

  showList = () => {
    this.currentView = {
      name: 'list',
      data: fromPromise(new Promise((resolve, reject) => {
        setTimeout(() => resolve([1, 2, 3, 4]), 1000)
      }))
    }
  }

  showItem = (id) => {
    this.currentView = {
      name: 'item',
      itemId: id,
      data: fromPromise(new Promise((resolve, reject) => {
        setTimeout(() => resolve(`Received data for item ${id}`), 1000)
      }))
    }
  }

}

export const store = new Store()


