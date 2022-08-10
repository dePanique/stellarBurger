import { Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { authenticationEnch } from "../../services/actions/auth";
import { useLocation } from 'react-router-dom'

export const ProtectedRoute = ({path, children, unAuthOnly, passReset, ...rest}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);

  const { success : isAuth } = useSelector(store => store.authStore);
  const { failed: isAccessUpdateFailed } = useSelector(store => store.logInStore.accessTokenStatus)
  const { success: isPassReseted} = useSelector(store => store.forgotPasswordStore)

console.log('prtocetedR');
  if (unAuthOnly && isAuth) {
    console.log('prtocetedR1');
    return <Redirect to='/' />
  }

  if (unAuthOnly && !isAuth) {
    console.log('prtocetedR2');

    if (passReset && !isPassReseted) {
      console.log('prtocetedR3');

      return <Redirect to='/forgot-password'/>
    }
    console.log('prtocetedR4');


    return (
      <Route
      path={`${path}`}
       children={children}
     />
    )
  }

  if (!isAuth || isAccessUpdateFailed) {
    console.log('prtocetedR5');

    return <Redirect to='/login' />
  }
  console.log('prtocetedR6');


  return (
    <Route
     path={`${path}`}
      children={children}
    />
  )
}

export default ProtectedRoute;