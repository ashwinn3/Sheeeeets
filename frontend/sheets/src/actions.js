/*
 * action types
 */
export const SESSION = 'SESSION';

/*
 * other constants
 */


/*
 * action creators
 */

export function login(id) {
  return { type: SESSION, id, direction: 'login' }
}

export function logout(id) {
  return { type: SESSION, id, direction: 'logout' }
}

