import React, { useEffect, useState, useContext } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getData } from "../../utils/utils";
import { BurgerContext } from './../services/burgerContext'
import { PickedIngredientsContext } from './../services/pickedIngredientsContext'

function App() {
  const [ingredientsData, setIngredientsData] = useState(false);
  const [pickedIngridients, setPickedIngredients] = useState(null);

  useEffect(() => {
    getData()
      .then((res) => {
        setIngredientsData(res)
        setPickedIngredients({
          bun: res['data'].filter((element) => element.type === "bun")[0],
          data: res['data'].filter((element) => element.type !== "bun").filter(() => Math.random() < 0.34),
        })
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  return (

      <div className={styles.app}>
        <AppHeader />
        <Main>
          {ingredientsData.success && (
            <React.Fragment>
              <BurgerContext.Provider value={{ingredientsData}}>
                <BurgerIngredients  />
                <PickedIngredientsContext.Provider value={pickedIngridients}>
                  <BurgerConstructor />
                </PickedIngredientsContext.Provider>
              </BurgerContext.Provider>
            </React.Fragment>
          )}
        </Main>
      </div>

  );
}

export default App;
