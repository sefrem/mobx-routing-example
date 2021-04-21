import {store} from "../store";
import {observer} from "mobx-react";

const withLoader = (Component) => {

  return observer(() => {
    const {state, value} = store.currentView.data || {};

    switch (state) {
      case "pending":
        return <div>Loading...</div>
      case "rejected":
        return <div>{value}</div>
      case "fulfilled":
        return <Component value={value} store={store}/>
    }

  })

}

export default withLoader
