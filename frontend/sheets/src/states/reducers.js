import { combineReducers } from 'redux'

import {
            SESSION_REQUEST_LOGIN,
            SESSION_RECEIVE_LOGIN,
            SESSION_LOGOUT,
            LOGIN_SET_USERNAME_PASSWORD,
            _LOGIN_TOGGLE_REGISTER,
            SUBMIT_LOGIN_INFO,
            REGISTER_SET_VALUES,
            REQUEST_REGISTER,
            RECEIVE_REGISTER,
            SUBMIT_REGISTRATION_INFO,
            EDIT_MESSAGE_MODAL,
            SUBMIT_CREATE_NEW_SHEET,
            RECEIVE_CREATE_NEW_SHEET,
            CHANGE_NAME_NEW_SHEET,
            RECEIVE_GET_SHEETS,
            SET_NAME_OF_SHEET_BEING_EDITED,
            SET_NEW_SHEET_NAME,
            REQUEST_CHANGE_SHEET_NAME,
            RECEIVE_CHANGE_SHEET_NAME,
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
    registerIsToggled: false,
    username: '',
    password: ''
}

function login(state = defaultLoginState, action) {
    switch (action.type) {
        case LOGIN_SET_USERNAME_PASSWORD:
            return Object.assign({}, state, {username: action.username, password: action.password});
        case _LOGIN_TOGGLE_REGISTER:
            return Object.assign({}, state, {registerIsToggled: !state.registerIsToggled});
        case SESSION_LOGOUT:
            return Object.assign({}, defaultLoginState);
        case SUBMIT_LOGIN_INFO: {
            const obj = {};
            obj[action.key] = action.value;
            return Object.assign({}, state, obj);
        }
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
const defaultModalState = {
    show: false,
    message: '',
}
function messageModal(state = defaultModalState, action) {
    switch (action.type) {
        case EDIT_MESSAGE_MODAL:
            return Object.assign({}, state, {message: action.message, show: action.show});
        default:
            return state
    }
}
// ==========================================
const defaultNewSheetState = {
    isFetching: false,
    error: null,
    name: '',
}
function newSheet(state = defaultNewSheetState, action) {
    switch (action.type) {
        case SUBMIT_CREATE_NEW_SHEET:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_CREATE_NEW_SHEET:
            return Object.assign({}, state, {isFetching: false, error: action.error});
        case CHANGE_NAME_NEW_SHEET:
            return Object.assign({}, state, {name: action.name});
        default:
            return state
    }
}
// ====================================
const defaultSheetState = {
    sheets: []
}
function sheets(state = defaultSheetState, action) {
    switch (action.type) {
        case RECEIVE_GET_SHEETS:
            return Object.assign({}, state, {sheets: action.sheets});
        case SET_NAME_OF_SHEET_BEING_EDITED:
            return Object.assign({}, state, {sheetBeingEdited: action.sheetName});
        case SET_NEW_SHEET_NAME:
            return Object.assign({}, state, {newSheetName: action.sheetName});
        case REQUEST_CHANGE_SHEET_NAME:
            return Object.assign({}, state);
        case RECEIVE_CHANGE_SHEET_NAME:
            return Object.assign({}, state);
        default:
            return state
    }
}






const todoApp = combineReducers({
  session, login, register, messageModal, newSheet, sheets
})

export default todoApp
