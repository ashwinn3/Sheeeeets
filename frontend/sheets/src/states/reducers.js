import { combineReducers } from 'redux'

import {
            SESSION,
            SESSION_REQUEST_LOGIN,
            SESSION_RECEIVE_LOGIN,
                                    } from './actions'

const defaultSessionState = {
    isFetching: false,
    userID: null,
    isLoggedIn: false,
    timeLoggedIn: false,
    error: null
}

function session(state = defaultSessionState, action) {
    switch (action.type) {
        case SESSION:
            return Object.assign({}, state, {id: action.id});
        case SESSION_REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true,
                userID: action.userID,
            });
        case SESSION_RECEIVE_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
                userID: action.userID,
                isLoggedIn: action.isLoggedIn,
                timeLoggedIn: action.timeLoggedIn,
                error: action.error
            });
    default:
      return state
  }
}


const todoApp = combineReducers({
  session
})

export default todoApp