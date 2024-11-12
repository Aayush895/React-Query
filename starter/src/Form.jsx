import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import customFetch from './utils'
import { toast } from 'react-toastify'

const Form = () => {
  const [newItemName, setNewItemName] = useState('')

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (taskTitle) =>
      customFetch.post('/', {
        title: taskTitle,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Task added')
      setNewItemName('')
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.msg || error.message
      toast.error(errorMessage)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate(newItemName)
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
