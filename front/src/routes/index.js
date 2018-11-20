import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Todos from './Todos'
import Todo from './Todo'

export default () => {
  return (
    <Switch>
      <Route path='/todos' exact component={Todos} />
      <Route path='/todos/:id' component={Todo} />

      <Redirect from='/' to='/todos' exact />
    </Switch>
  )
}