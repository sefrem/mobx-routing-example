import withLoader from "./withLoader";

const List = ({value, store}) => (
      <div>
        <h4>List</h4>
        <ul>
          {value?.map(id => (
            <li key={id} onClick={() => store.showItem(id)}>Item {id}</li>
          ))}
        </ul>
      </div>
    )

export default withLoader(List)
