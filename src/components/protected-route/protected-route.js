import { Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authenticationEnch } from "../../services/actions/auth";

export const ProtectedRoute = ({children, unAuthOnly, passReset, ...rest}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authenticationEnch());
  }, []);


  const history = useHistory();
  console.log(history);
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


    return <Route >{children}</Route>
  }

  if (!isAuth || isAccessUpdateFailed) {
    console.log('prtocetedR5');

    return <Redirect to='/login' />
  }
  console.log('prtocetedR6');


  return <Route >{children}</Route>
}

export default ProtectedRoute;