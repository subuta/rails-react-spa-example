import React from 'react'
import { hot } from 'react-hot-loader'

import _ from 'lodash'

import Routes from 'src/routes'
import AppContext from 'src/utils/AppContext'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      entities: {},
      todoIds: [],

      update: this.update,
      mergeEntities: this.mergeEntities,

      getTodos: this.getTodos,
      getTodo: this.getTodo,
    }
  }

  update = (arg) => {
    this.setState(arg)
  }

  mergeEntities = (state, data, key) => {
    return {
      ...state.entities,

      [key]: {
        ...state.entities[key] || {},
        ...data.entities[key] || {}
      }
    }
  }

  getTodos = () => {
    const ids = _.get(this.state, 'todoIds', [])
    return _.map(ids, (id) => this.getTodo(id))
  }

  getTodo = (id) => {
    const entities = _.get(this.state, 'entities.todos', {})
    return entities[Number(id)]
  }

  render () {
    return (
      <AppContext.Provider value={this.state}>
        <Routes />
      </AppContext.Provider>
    )
  }
}

export default hot(module)(App)