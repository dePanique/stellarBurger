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
} from "../../pages";
import { ProtectedRoute } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import React, { useEffect } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/app';
import { authenticationEnch } from '../../services/actions/auth';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    history.replace({pathname : `${location.pathname}`, state: {}})
    dispatch(getIngredients());
    dispatch(authenticationEnch());
  }, []);

  const location = useLocation();
  const history = useHistory();
  let background = location.state?.background;

  return (
    <React.Fragment>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
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
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" >
          <IngredientPage />
        </Route>
        <Route>
          <Page404 path='*' />
        </Route>
      </Switch>
      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal history={history}>
              <IngredientDetails/>
            </Modal>
          }
        />
      )}
    </React.Fragment>

  );
}