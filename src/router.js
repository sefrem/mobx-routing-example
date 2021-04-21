import {autorun, reaction} from "mobx";
import history from 'history/browser';
import {fromResource} from "mobx-utils";

const urlMatcher = (url, scheme) => {

  Object.entries(scheme).forEach(([path, action]) => {
    if (url.includes(path)) {
      action()
    }

    if (path.includes(":")) {
      const pathItems = path.split('/')
      const urlItems = url.slice(1).split('/')

      for (let i = 0; i < urlItems.length; i++) {
        if (pathItems[i].includes(':')) {
          action(urlItems[i])
        }
        if (urlItems[i] !== pathItems[i]) {
          break
        }
      }
    }

  })
}

function createObservableHistory() {
  let currentSubscription;
  return fromResource(
    (sink) => {
      currentSubscription = history.listen(({action}) => {
        sink({action})
      });
    },
    () => {
      currentSubscription()
    }
  )
}

const match = (store) => {
  urlMatcher(history.location.pathname, {
    'list': store.showList,
    'item/:itemId': (id) => store.showItem(id)
  })
}

const myObservableHistory = createObservableHistory()

export const router = (store) => {
  match(store)

  autorun(() => {
    if (store.currentPath !== history.location.pathname) {
      history.push(store.currentPath)
    }
  })

  reaction(() => myObservableHistory.current(), (value) => {
    if (value.action === 'POP') {
      match(store)
    }
  })

  // autorun(() => {
  //   if(myObservable.current().action === 'POP') {
  //     match(store)
  //   }
  // })

}




