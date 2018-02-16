import { combineReducers } from 'redux'

import {
            SESSION,
            SESSION_REQUEST_LOGIN,
            SESSION_RECEIVE_LOGIN,
            SESSION_LOGOUT,
            LOGIN_SET_USERNAME_PASSWORD,
            _LOGIN_TOGGLE_REGISTER,
            REGISTER_SET_VALUES,
            REQUEST_REGISTER,
            RECEIVE_REGISTER,
            SUBMIT_REGISTRATION_INFO,
                                    } from './actions'




// ==========================================
const defaultSessionState = {
    isFetching: false,
    username: null,
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
                username: action.username,
            });
        case SESSION_RECEIVE_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
                username: action.username,
                isLoggedIn: action.isLoggedIn,
                timeLoggedIn: action.timeLoggedIn,
                error: action.error
            });
        case SESSION_LOGOUT:
            return Object.assign({}, defaultSessionState);
    default:
      return state
  }
}
// ==========================================


// ==========================================
const defaultLoginState = {
    registerIsToggled: false
}

function login(state = defaultLoginState, action) {
    switch (action.type) {
        case LOGIN_SET_USERNAME_PASSWORD:
            return Object.assign({}, state, {username: action.username, password: action.password});
        case _LOGIN_TOGGLE_REGISTER:
            return Object.assign({}, state, {registerIsToggled: !state.registerIsToggled});
        case SESSION_LOGOUT:
            return Object.assign({}, defaultLoginState);
        default:
            return state
    }
}
// ==========================================


// ==========================================
const defaultRegisterState = {
    isRegistering: false,
    wasSuccessful: true,
    error: null,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
}

function register(state = defaultRegisterState, action) {
    switch (action.type) {
        case REQUEST_REGISTER:
            return Object.assign({}, state, {isRegistering: true});
        case SUBMIT_REGISTRATION_INFO:
            const obj = {};
            obj[action.key] = action.value;
            return Object.assign({}, state, obj);
        case RECEIVE_REGISTER:
            return Object.assign({}, state, {isRegistering: false, wasSuccessful: action.wasSuccessful,
                error: action.error});
        case REGISTER_SET_VALUES:
            return Object.assign({}, state, {username: action.username, password: action.password,
                firstName: action.firstName, lastName: action.lastName, email: action.email});
        case SESSION_LOGOUT:
            return Object.assign({}, defaultRegisterState);
        default:
            return state
    }
}
// ==========================================



const todoApp = combineReducers({
  session, login, register
})

export default todoApp
