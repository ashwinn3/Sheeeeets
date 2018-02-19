/*
 * action types
 */
export const SESSION = 'SESSION';
export const SESSION_REQUEST_LOGIN = 'SESSION_REQUEST_LOGIN';
export const SESSION_RECEIVE_LOGIN = 'SESSION_RECEIVE_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export const LOGIN_SET_USERNAME_PASSWORD = 'LOGIN_SET_USERNAME_PASSWORD';
export const _LOGIN_TOGGLE_REGISTER = '_LOGIN_TOGGLE_REGISTER';
export const SUBMIT_LOGIN_INFO = 'SUBMIT_LOGIN_INFO';


export const REGISTER_SET_VALUES =  'REGISTER_SET_VALUES';
export const REQUEST_REGISTER =  'SESSION_REQUEST_REGISTER';
export const RECEIVE_REGISTER =  'SESSION_RECEIVE_REGISTER';
export const SUBMIT_REGISTRATION_INFO =  'SUBMIT_REGISTRATION_INFO';

export const EDIT_MESSAGE_MODAL =  'SHOW_MESSAGE_MODAL';



/////////// CREATING NEW SHEETS ////////////////////
export const SUBMIT_CREATE_NEW_SHEET = 'SUBMIT_CREATE_NEW_SHEET';
export const RECEIVE_CREATE_NEW_SHEET = 'RECEIVE_CREATE_NEW_SHEET';
export const CHANGE_NAME_NEW_SHEET = 'CHANGE_NAME_NEW_SHEET';

function submitCreateNewSheet(name) {
    return {type: SUBMIT_CREATE_NEW_SHEET, name};
}
function receiveCreateNewSheet(name, error) {
    return {type: RECEIVE_CREATE_NEW_SHEET, name, error};
}
export function changeNewSheetName(name) {
    return {type: CHANGE_NAME_NEW_SHEET, name};
}
export function createNewSheet(name, username) {
    console.log(username)
    return function (dispatch) {
        dispatch(submitCreateNewSheet(username));
        return fetch('http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/addSheet?username='
            + username + '&name=' + name, {
                mode: 'cors',
                method: 'POST',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            console.log(json);
            dispatch(getSheets(username));
            return dispatch(receiveCreateNewSheet(name));
        });
    }
}
///////////////////////////////////////////////////

/////////////// HANDLEING SHEETS //////////////////
export const SUBMIT_GET_SHEETS = 'SUBMIT_GET_SHEETS';
export const RECEIVE_GET_SHEETS = 'RECEIVE_GET_SHEETS';
export const CHANGE_NAME_SHEET = 'CHANGE_NAME_SHEET';
function submitGetSheets() {
    return {type: SUBMIT_GET_SHEETS};
}
function receiveGetSheets(sheets) {
    return {type: RECEIVE_GET_SHEETS, sheets};
}
export function changeSheetName(sheetID) {
    return {type: CHANGE_NAME_NEW_SHEET};
}
export function getSheets(username) {
    return function (dispatch) {
        dispatch(submitGetSheets());
        return fetch('http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/getSheets?username='
                + username, {
                mode: 'cors',
                method: 'GET',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            console.log(json);
            return dispatch(receiveGetSheets(json.names));
        });
    }
}
///////////////////////////////////////////////////



export function editMessageModal({show, message}) {
    return {type: EDIT_MESSAGE_MODAL, show, message};
}

export function showMessageModal(message) {
    return function (dispatch) {
        dispatch(editMessageModal({
            message: message,
            show: true
        }));
        setTimeout(() => dispatch(editMessageModal({
            show: false,
        })), 1000);
    }
}

///////////////////////////////////////////////////


export function requestLogin(username) {
  return {
    type: SESSION_REQUEST_LOGIN,
    username
  }
}

export function receiveLogin(username, isLoggedIn, error) {
  return {
    type: SESSION_RECEIVE_LOGIN,
    username,
    isLoggedIn,
    timeLoggedIn: Date.now(),
    error
  }
}
export function attemptLogin(username, password) {

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(requestLogin(username));

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch('http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/login?username='
            + username + '&password=' + password, {
                mode: 'cors',
                method: 'GET',
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            const isLoggedIn = (json.response === 'Login Success');
            const error = (isLoggedIn) ? null : 'Error logging in';
            if (isLoggedIn) {
                dispatch(showMessageModal('Login Successful!'));
            }
            return dispatch(receiveLogin(username, isLoggedIn, error));
        });
    }
}

export function requestLogout() {
    return function (dispatch) {
        dispatch(logout());
        dispatch(showMessageModal('Logout Successful!'));
    }
}
export function logout() {
    return {
        type: SESSION_LOGOUT,
    }
}



export function requestRegister() {
  return {
    type: REQUEST_REGISTER,
  }
}
export function receiveRegister(success, error) {
  return {
    type: RECEIVE_REGISTER,
    wasSuccessful: success,
    error,
  }
}
export function submitRegistrationInfo(key, value) {
  return {
    type: SUBMIT_REGISTRATION_INFO,
    key,
    value,
  }
}

export function attemptRegister({username, password, firstName, lastName, email}) {
    return function (dispatch) {
        dispatch(requestRegister());
        if(username.length < 1 || password.length < 1 || firstName.length < 1 || lastName.length < 1 || email.length < 1) {
            const success = false;
            const error = 'Please finish filling in the form'
            console.log('not long enough')
            return dispatch(receiveRegister(success, error));
        }
        return fetch("http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/register?username=" +
            `${username}&password=${password}&email=${email}`, {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:8080',
                }),
                body: JSON.stringify({
                    name : username,
                    pass : password,
                    first : firstName,
                    last : lastName,
                    email : email
                }),
        })
        .then((response) => response.json(),
            (error) => console.log('An error occurred.', error))
        .then((json) => {
            const success = json.response === 'Success: User registered';
            if (success) {
                dispatch(toggleRegister());
                dispatch(showMessageModal('Registration Successful!'));
                dispatch(setUsernamePassword(username, ''));
                dispatch(setValuesForRegister('', '', '', '', ''));
            }
            const error = (success) ? null : json.response;
            return dispatch(receiveRegister(success, error));
        });
    }
}



export function toggleRegister() {
    return { type: _LOGIN_TOGGLE_REGISTER}
}
export function setUsernamePassword(username, password) {
    return { type: LOGIN_SET_USERNAME_PASSWORD, username, password}
}
export function submitLoginInfo(key, value) {
    return {
        type: SUBMIT_LOGIN_INFO,
        key,
        value,
    }
}
export function setValuesForRegister(username, password, firstName, lastName, email) {
    return { type: REGISTER_SET_VALUES, username, password, firstName, lastName, email}
}












