import axios from 'axios'

const baseURL = process.env.BASE_URL ? process.env.BASE_URL : 'https://localhost:8080'

axios({ baseURL })

const http = {
  get: axios.get,
  post: axios.post
}

export default http;