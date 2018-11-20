import React from 'react'
import ReactDOM from 'react-dom'

const app = (
  <h1>Hello world</h1>
)

ReactDOM.render(app, document.querySelector('#app'))

if (module.hot) {
  module.hot.accept()
}