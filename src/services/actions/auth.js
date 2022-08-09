export const AUTH_PROCESS = 'AUTH_PROCESS';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const AUTH_RESET = 'AUTH_RESET';

export const authenticationEnch = () => {

  return function(dispatch) {

    dispatch({
      type: AUTH_PROCESS
    })

    if (localStorage.getItem('refreshToken')) {
      dispatch({
        type: AUTH_SUCCESS
      })
    } else {
      dispatch({
        type: AUTH_FAILED
      })
    }
  }
}