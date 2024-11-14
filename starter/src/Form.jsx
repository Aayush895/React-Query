import { useState } from 'react'
import { usecreateTask } from './reactQueryCustomHooks'

const Form = () => {
  const [newItemName, setNewItemName] = useState('')
  const { createTask } = usecreateTask()

  const handleSubmit = (e) => {
    e.preventDefault()
    createTask(newItemName)
    setNewItemName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className="form-control">
        <input
          type="text "
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type="submit" className="btn" onClick={handleSubmit}>
          add task
        </button>
      </div>
    </form>
  )
}
export default Form
