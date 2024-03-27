import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = newToken === null ? null : `Bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async(newBlog) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async(newBlog) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)
  return response.data
}

const deleteBlog = async(id) => {
  const config = {
    headers: { authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, setToken, create, update, deleteBlog }