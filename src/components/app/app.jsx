import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
        data: [],
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
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </React.Fragment>
          )}
        </Main>
      </div>

  );
}

export default App;
