import React from 'react'
import ReactDOM from 'react-dom'
import request from 'src/utils/request'

request.get('/todos').then((response) => {
  console.log(response.data);
})

const app = (
  <h1>Hello world</h1>
)

ReactDOM.render(app, document.querySelector('#app'))

if (module.hot) {
  module.hot.accept()
}