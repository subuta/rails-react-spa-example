import { createContext } from 'react'

// SEE: https://reactjs.org/docs/context.html
export default createContext({
  entities: {},
  todoIds: [],

  update: () => {},
  mutate: () => {},

  getTodos: () => {},
  getTodo: () => {},
})