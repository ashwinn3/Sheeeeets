import { combineReducers } from 'redux'
import {
  SESSION,
} from './actions'

function sessionControl(state = {}, action) {
  console.log(state);
  switch (action.type) {
    case SESSION:
      return Object.assign({}, state, {id: action.id})
    default:
      return state
  }
}


const todoApp = combineReducers({
  sessionControl
})

export default todoApp