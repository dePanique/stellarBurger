import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import AppHeader from "../app-header/app-header";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPassword,
  ResetPassword,
  ProfilePage,
  Page404,
  IngredientPage,
  FeedPage,
} from "../../pages";
import { ProtectedRoute } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import React, { useEffect } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getIngredients } from '../../services/actions/app';
import { authenticationEnch } from '../../services/actions/auth';
import { BurgerDetails } from '../burger-details/burger-details';
import { OrderPage } from '../../pages/order-page';
import { OrderPageProfile } from '../../pages/order-page-profile';
import { getCookie } from '../../utils/cookies';
import { appUseDispatch, appUseSelector } from '../../utils/hooks';
import { TLocation } from '../../utils/type';
import { History } from 'history'
import OrderDetails from '../order-details/order-details';


export default function App() {

  const dispatch = appUseDispatch()
  const history: History = useHistory();

  const { failed: accessFail } = appUseSelector(store => store.logInStore.accessTokenStatus)

  useEffect(() => {
    getCookie('accessToken')
    history.replace({ pathname: `${location.pathname}`, state: {} })
    dispatch(getIngredients());
    dispatch(authenticationEnch());
  }, []);

  useEffect(() => {
    if (accessFail) history.replace({ pathname: '/login' })
  }, [accessFail])

  const location: TLocation<{background?: TLocation}> = useLocation();

  const background: TLocation | undefined = location?.state?.background;

  return (
    <React.Fragment>
      <AppHeader />
      <Switch location={ background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderPage />
        </Route>
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <OrderPageProfile />
        </ ProtectedRoute>
        <ProtectedRoute path="/login" exact={true} unAuthOnly>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute path="/register" exact={true} unAuthOnly>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" exact={true} unAuthOnly>
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" exact={true} unAuthOnly passReset>
          <ResetPassword />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" unAuthOnly={false}
          render={() => <ProfilePage />}>
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true} unAuthOnly={false}
          render={() => <ProfilePage />}>
        </ProtectedRoute>
        <Route path="/ingredients/:id" >
          <IngredientPage />
        </Route>
        <Route path='*'>
          <Page404 />
        </Route>
      </Switch>
      {background && (
        <Switch >
          <Route
            path="/ingredients/:id"
            children={
              <Modal history={history}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path="/feed/:id"
            render={() => (
              <Modal history={history}>
                <BurgerDetails />
              </Modal>
            )}
          />

          <Route
            path="/profile/orders/:id"
            render={() => (
              <Modal history={history}>
                <BurgerDetails />
              </Modal>
            )}
          />

          <Route
            path="/order-details"
            render={() => (
              <Modal history={history}>
                <OrderDetails />
              </Modal>
            )}
          />
        </Switch>
      )}
    </React.Fragment>
  );
}
