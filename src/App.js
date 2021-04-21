import {observer} from 'mobx-react'
import './App.css';
import {store} from './store'
import {manageRoutes} from "./routeManager";

function App() {
  return (
    <div className="App">
      {manageRoutes(store)}
      <button onClick={store.showList}>Open List</button>
    </div>
  );
}

export default observer(App);
