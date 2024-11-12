import axios from 'axios'

// Creating a custom instance for axios where the base url will be same for all the api interaction
const customFetch = axios.create({
  baseURL: 'http://localhost:4000/api/tasks'
})

export default customFetch