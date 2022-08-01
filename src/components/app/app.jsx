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

export default function App() {

  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage/>
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword/>
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword/>
        </Route>
        <Route path="/profile" exact={true}>
          <ProfilePage/>
        </Route>
      </Switch>
    </Router>
  );
}