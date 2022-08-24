import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ path, children, unAuthOnly, passReset, ...rest }) => {

  const location = useLocation();

  const { success: isAuth } = useSelector(store => store.authStore);
  const { failed: isAccessUpdateFailed } = useSelector(store => store.logInStore.accessTokenStatus);
  const { success: isPassReseted } = useSelector(store => store.forgotPasswordStore);

  let token = localStorage.getItem('refreshToken');

  if (token && !unAuthOnly) {

    return <Route
      children={children}
      {...rest}
    />
  }

  if (unAuthOnly && token) {

    return <Redirect to={{ pathname: location?.state?.from?.pathname || '/', state: { from: location } }} />
  }

  if (unAuthOnly && !isAuth) {

    if (passReset && !isPassReseted) {

      return <Redirect to='/forgot-password' />
    }

    return (
      <Route
        children={children}
        {...rest}
      />
    )
  }

  if (!token || !isAuth || isAccessUpdateFailed) {

    return <Redirect to={{ pathname: '/login', state: { from: location } }} />
  }

}

export default ProtectedRoute;