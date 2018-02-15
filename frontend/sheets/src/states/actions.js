/*
 * action types
 */
export const SESSION = 'SESSION';
export const SESSION_REQUEST_LOGIN = 'SESSION_REQUEST_LOGIN';
export const SESSION_RECEIVE_LOGIN = 'SESSION_RECEIVE_LOGIN';


export function requestLogin(userID) {
  return {
    type: SESSION_REQUEST_LOGIN,
    userID
  }
}

export function receiveLogin(userID, isLoggedIn, error) {
  return {
    type: SESSION_RECEIVE_LOGIN,
    userID,
    isLoggedIn,
    timeLoggedIn: Date.now(),
    error
  }
}
export function attemptLogin(userID) {

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(requestLogin(userID));

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch("http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/login?username=" + userID + "&password=" + "34", {
                method: "GET",
        })
        // !!! Do not use catch !!! Catch would cause error, if error only log it
            .then((response) => response.json(),
                (error) => console.log('An error occurred.', error))
            .then((json) => {
                    const isLoggedIn = true;
                    const error = 'yes';
                    return dispatch(receiveLogin(userID, isLoggedIn, error));
                }
            )
    }
}







export function login(id) {
  return { type: SESSION, id, direction: 'login' }
}

export function logout(id) {
  return { type: SESSION, id, direction: 'logout' }
}

