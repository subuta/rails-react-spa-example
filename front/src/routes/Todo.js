import React from 'react'
import _ from 'lodash'

import { Link } from 'react-router-dom'

import api from 'src/utils/api'
import AppContext from 'src/utils/AppContext'
import dayjs from 'src/utils/dayjs'

class Todo extends React.Component {
  static contextType = AppContext

  constructor (props) {
    super(props)

    this.state = {
      draftTitle: ''
    }
  }

  componentDidMount () {
    const todoId = this.getTodoId(this.props)
    if (todoId === 'new') return

    this.fetchTodo(todoId)
  }

  componentDidUpdate (prevProps) {
    const todoId = this.getTodoId(this.props)
    const nextTodoId = this.getTodoId(prevProps)

    if (nextTodoId === 'new' || todoId === nextTodoId) return

    this.fetchTodo(todoId)
  }

  fetchTodo (todoId) {
    // Fetch data from API Server.
    api.todo.getTodo(todoId).then((data) => {
      this.context.update((state) => {
        return {
          entities: this.context.mergeEntities(state, data, 'todos'),
          todoIds: data.result ? [data.result] : [],
        }
      })
    })
  }

  getTodoId (props) {
    const {match} = props
    return _.get(match, 'params.id', null)
  }

  getTodo () {
    const todoId = this.getTodoId(this.props)

    if (todoId === 'new') {
      return {
        id: null,
        title: '',
        is_done: false
      }
    }

    return this.context.getTodo(todoId)
  }

  onCreateTodo = (params) => {
    const {history} = this.props

    // Insert data to API Server.
    api.todo.createTodo(params).then((data) => {
      this.context.update((state) => {
        return {entities: this.context.mergeEntities(state, data, 'todos')}
      })

      history.push(`/todos/${data.result}`)
    })
  }

  onUpdateTodo = (id, params) => {
    // Update data of API Server.
    api.todo.updateTodo(id, params).then((data) => {
      this.context.update((state) => {
        return {entities: this.context.mergeEntities(state, data, 'todos')}
      })
    })
  }

  onDeleteTodo = (id) => {
    const {history} = this.props

    // Delete data from API Server.
    api.todo.deleteTodo(id).then((data) => {
      this.context.update((state) => {
        return {
          entities: {
            ...state.entities,
            todos: _.omit(state.entities.todos, id)
          },

          todoIds: _.without(state.todoIds, id)
        }
      })

      history.push('/todos')
    })
  }

  handleSave = (id, params) => {
    if (id === null) {
      this.onCreateTodo(params)
    } else {
      this.onUpdateTodo(id, params)
    }
  }

  handleInput = (e) => {
    this.setState({draftTitle: e.target.value})
  }

  render () {
    const todo = this.getTodo()

    if (!todo) return null

    const isNew = !todo.id

    const draftTitle = this.state.draftTitle

    return (
      <div className='p-4'>
        <h1 className='mb-6'>Todo{todo.id ? `(id: ${todo.id})` : ''}</h1>

        <div>
          <input
            className='text-lg border-b-2'
            defaultValue={todo.title}
            onInput={this.handleInput}
          />

          <button
            className='ml-2 py-1 px-2 border bg-grey-lighter text-sm font-bold rounded outline-none hover:bg-grey'
            onClick={() => {
              this.handleSave(todo.id, {
                title: draftTitle,
                is_done: todo.is_done === undefined ? false : todo.is_done
              })
            }}
          >
            {isNew ? 'Create' : 'Update'}
          </button>
        </div>

        {!isNew && (
          <div className='mt-4 leading-normal'>
            <p className={`text-sm text-grey-darker font-bold ${todo.is_done? 'text-green' : ''}`}>Is Done?: {JSON.stringify(todo.is_done)}</p>
            <p className='text-sm text-grey-darker font-bold'>Created At: {dayjs(todo.created_at).fromNow()}</p>
          </div>
        )}

        {!isNew && (
          <div className='mt-6'>
            <button
              className='py-1 px-2 border bg-grey-lighter text-sm font-bold rounded outline-none hover:bg-grey'
              onClick={() => this.onDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        )}

        <div className='mt-6'>
          <Link to='/todos'>Back to /todo</Link>
        </div>
      </div>
    )
  }
}

export default Todo