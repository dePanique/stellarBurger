import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from "../app-header/app-header";
import { HomePage, LoginPage, RegisterPage } from "../../pages"

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
      </Switch>
    </Router>
  );
}