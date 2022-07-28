import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from "../app-header/app-header";
import { HomePage } from "../../pages"

export default function App() {

  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}