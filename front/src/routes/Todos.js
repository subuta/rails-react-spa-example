import React from 'react'
import _ from 'lodash'

import { Link } from 'react-router-dom'

import api from 'src/utils/api'
import AppContext from 'src/utils/AppContext'

class Todos extends React.Component {
  static contextType = AppContext

  componentDidMount () {
    // Fetch data from API Server.
    api.todo.getTodos().then((data) => this.context.update({
      entities: data.entities || {},
      todoIds: data.result || [],
    }))
  }

  onUpdateTodo = (id, params) => {
    // Update data of API Server.
    api.todo.updateTodo(id, params).then((data) => {
      this.context.update((state) => {
        return {entities: this.context.mergeEntities(state, data, 'todos')}
      })
    })
  }

  render () {
    const todos = this.context.getTodos()

    return (
      <div className='p-4'>
        <h1 className='mb-6'>Todos</h1>

        <ul>
          {_.map(todos, (todo) => (
            <li
              className='mb-2 cursor-pointer'
              key={todo.id}
            >
              <input
                className='mr-2'
                type="checkbox"
                onClick={() => this.onUpdateTodo(todo.id, {is_done: !todo.is_done})}
                onChange={_.noop}
                checked={todo.is_done}
              />

              <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
            </li>
          ))}
        </ul>

        <div className='mt-6'>
          <Link
            className='py-1 px-2 border bg-grey-lighter text-sm font-bold rounded outline-none hover:bg-grey no-underline text-black'
            to='/todos/new'
          >
            New
          </Link>
        </div>
      </div>
    )
  }
}

export default Todos