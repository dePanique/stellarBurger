import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIgredients } from '../services/actions/app';


function App() {
  const dispatch = useDispatch();
  const { data } = useSelector(store => store.appStore);

  useEffect(() => {
    dispatch(getIgredients())
  }, []);

  useEffect(() => {
    data.length && dispatch({
      type: 'SET_BUN',
      payload: {
        data: data.filter((element) => element.type !== "bun").filter(() => Math.random() < 0.34),
        bun: data.find((element) => element.type === "bun"),
      }
    })
  }, [data])
//
  return (

      <div className={styles.app}>
        <AppHeader />
        <Main>
          {data.length && (
            <React.Fragment>
              <BurgerIngredients />
              <BurgerConstructor />
            </React.Fragment>
          )}
        </Main>
      </div>

  );
}

export default App;
