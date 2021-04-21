import withLoader from "./withLoader";

const Item = ({value}) => (
      <div>Item - {value}</div>
    )

export default withLoader(Item)
