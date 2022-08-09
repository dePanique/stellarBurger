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


  if (unAuthOnly && isAuth) {
    return <Redirect to='/' />
  }

  if (unAuthOnly && !isAuth) {

    if (passReset && !isPassReseted) {
      console.log(4)
      return <Redirect to='/forgot-password'/>
    }
    console.log(3);

    return <Route >{children}</Route>
  }

  if (!isAuth || isAccessUpdateFailed) {
    return <Redirect to='/login' />
  }


  return <Route >{children}</Route>
}

export default ProtectedRoute;