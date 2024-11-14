import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import customFetch from './utils'

export function usefetchTasks() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await customFetch.get('/')
      return data
    },
  })

  return { isLoading, data, isError }
}

export function usecreateTask() {
  const queryClient = useQueryClient()
  const { mutate: createTask } = useMutation({
    mutationFn: (taskTitle) =>
      customFetch.post('/', {
        title: taskTitle,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Task added')
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.msg || error.message
      toast.error(errorMessage)
    },
  })

  return { createTask }
}

export function useeditTask() {
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

  return { editTask }
}

export function usedeleteTask() {
  const queryClient = useQueryClient()
  const { mutate: deleteTask } = useMutation({
    mutationFn: ({ id }) => {
      return customFetch.delete(`/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return { deleteTask }
}
