import List from "./components/List";
import Item from "./components/Item";

export const manageRoutes = (store) => {
  switch (store.currentView?.name) {
    case 'list':
      return <List/>
    case 'item' :
      return <Item/>
    default:
      return null
  }
}
