import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import customFetch from './utils'

const SingleItem = ({ item }) => {
  const [isChecked, setisChecked] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: editTask } = useMutation({
    mutationFn: ({ id, isDone }) => {
      return customFetch.patch(`/${id}`, {
        isDone,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const { mutate: deleteTask } = useMutation({
    mutationFn: ({ id }) => {
      return customFetch.delete(`/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => editTask({ id: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => deleteTask({ id: item.id })}
      >
        delete
      </button>
    </div>
  )
}
export default SingleItem
