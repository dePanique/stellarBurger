import { FC } from 'react';
import { Route, Redirect, useLocation } from "react-router-dom";
import { appUseSelector } from '../../utils/hooks';
import { IProtectedRoute, TLocation } from '../../utils/type';

export const ProtectedRoute: FC<IProtectedRoute> = ({ path, children, unAuthOnly, passReset, ...rest }) => {

  let token: string | null = localStorage.getItem('refreshToken');
  const location: TLocation<{ from?: TLocation }> = useLocation();

  const { success: isAuth } = appUseSelector(store => store.authStore);
  const { failed: isAccessUpdateFailed } = appUseSelector(store => store.logInStore.accessTokenStatus);
  const { success: isPassReseted }: {
    success: boolean;
  } = appUseSelector(store => store.forgotPasswordStore);

  if (token && !unAuthOnly) {
    return (
      <Route
        children={children}
        {...rest}
      />
    );
  }

  if (unAuthOnly && token) {
    return (
      <Redirect
        to={{
          pathname: location?.state?.from?.pathname || '/',
          state: { from: location },
        }}
      />
    );
  }

  if (unAuthOnly && !isAuth) {
    if (passReset && !isPassReseted) {
      return (
        <Redirect to='/forgot-password' />
      );
    }

    return (
      <Route
        children={children}
        {...rest}
      />
    );
  }

  if (!token || !isAuth || isAccessUpdateFailed) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    );
  }

  return null
}

export default ProtectedRoute;