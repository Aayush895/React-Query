import SingleItem from './SingleItem'
import { usefetchTasks } from './reactQueryCustomHooks'

const Items = ({ items }) => {
  const { isLoading, data, isError } = usefetchTasks()

  if (isLoading) {
    return <p style={{ marginTop: '1rem' }}>Loading...</p>
  }

  if (isError) {
    return <p style={{ marginTop: '1rem ' }}>there was an error...</p>
  }

  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />
      })}
    </div>
  )
}
export default Items
