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
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/app';
import { authenticationEnch } from '../../services/actions/auth';
import { BurgerDetails } from '../burger-details/burger-details';
import { OrderPage } from '../../pages/order-page';

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { failed: accessFail } = useSelector(store => store.logInStore.accessTokenStatus)

  useEffect(() => {
    console.log(2);
    history.replace({ pathname: `${location.pathname}`, state: {} })
    dispatch(getIngredients());
    dispatch(authenticationEnch());
  }, []);

  useEffect(() => {
    if (accessFail) history.replace({ pathname: '/login' })
  }, [accessFail])

  const location = useLocation();
  const background = location.state?.background;

  return (
    <React.Fragment>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route
          path="/feed"
          exact={true}
        >
          <FeedPage />
        </Route>
        <Route
          path="/feed/id"
          exact={true}
        >
          <OrderPage />
        </Route>
        <ProtectedRoute
          path="/profile/orders/id"
          exact={true}
        >
          <OrderPage />
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
        {/* <ProtectedRoute path="/profile/orders" exact={true} unAuthOnly={false}
          render={() => <ProfilePage />}>
        </ProtectedRoute> */}
        <Route path="/ingredients/:id" >
          <IngredientPage />
        </Route>
        <Route>
          <Page404 path='*' />
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
            path="/feed/id"

            render={() => (
              <Modal history={history}>
                <BurgerDetails />
              </Modal>
            )}
          />
          <Route
            path="/profile/orders/id"

            render={() => (
              <Modal history={history}>
                <BurgerDetails />
              </Modal>
            )}
          />
        </Switch>
      )}
    </React.Fragment>

  );
}