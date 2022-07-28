import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import { HomePage } from "../../pages"

function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
      <Main>
        <HomePage />
      </Main>
    </div>
  );
}

export default App;
