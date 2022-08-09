import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from "../app-header/app-header";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPassword,
  ResetPassword,
  ProfilePage,
} from "../../pages";
import { ProtectedRoute } from '../protected-route/protected-route';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticationEnch } from '../../services/actions/auth';

export default function App() {

  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <ProtectedRoute path="/login" exact={true} unAuthOnly>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute path="/register" exact={true} unAuthOnly>
          <RegisterPage/>
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" exact={true} unAuthOnly>
          <ForgotPassword/>
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" exact={true} unAuthOnly passReset>
          <ResetPassword/>
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <ProfilePage/>
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}