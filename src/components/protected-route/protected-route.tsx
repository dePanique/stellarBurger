import  { FC } from 'react';

import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { appUseSelector } from '../../utils/hooks';
import { ILocation } from '../../utils/type';

interface IProtectedRoute extends RouteProps  {
  readonly unAuthOnly?: boolean,
  readonly passReset?: boolean,
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ path, children, unAuthOnly, passReset, ...rest }) => {

  const location: ILocation<{from?: ILocation}> = useLocation();

  const { success: isAuth } = appUseSelector(store => store.authStore);
  const { failed: isAccessUpdateFailed } = appUseSelector(store => store.logInStore.accessTokenStatus);
  const { success: isPassReseted } = appUseSelector(store => store.forgotPasswordStore);

  let token: string | null = localStorage.getItem('refreshToken');

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

  return null
}

export default ProtectedRoute;