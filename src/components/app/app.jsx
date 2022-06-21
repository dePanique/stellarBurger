import React, { useEffect, useState, useContext } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getData } from "../../utils/utils";
import { BurgerContext, PickedIngredients } from './../services/burgerContext'

function App() {
  const [ingredientsData, setIngredientsData] = useState(false);
  const [pickedIngridients, setPickedIngredients] = useState(null);

  useEffect(() => {
    getData()
      .then((res) => {
        setIngredientsData(res)
        setPickedIngredients({
          bun: res['data'].filter((element) => element.type === "bun")[0],
          data: res['data'].filter((element) => element.type !== "bun").filter((_, index) => index%2),
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
                <PickedIngredients.Provider value={pickedIngridients}>
                  <BurgerConstructor />
                </PickedIngredients.Provider>
              </BurgerContext.Provider>
            </React.Fragment>
          )}
        </Main>
      </div>

  );
}

export default App;
