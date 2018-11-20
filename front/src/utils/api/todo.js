import request from 'src/utils/request'

import { normalize } from 'normalizr'
import {
  todo,
  todoList
} from 'src/utils/schema'

const getTodos = () => {
  return request.get('/todos').then((response) => {
    return normalize(response.data, todoList)
  })
}

const getTodo = (id) => {
  return request.get(`/todos/${id}`).then((response) => {
    return normalize(response.data, todo)
  })
}

const createTodo = (params) => {
  return request.post('/todos', { todo: params }).then((response) => {
    return normalize(response.data, todo)
  })
}

const updateTodo = (id, params) => {
  return request.put(`/todos/${id}`, { todo: params }).then((response) => {
    return normalize(response.data, todo)
  })
}

const deleteTodo = (id) => {
  return request.delete(`/todos/${id}`)
}

export default {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
}