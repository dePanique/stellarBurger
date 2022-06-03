import React, { useEffect, useState } from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import ModalOverlay from '../modal-overlay/modal-overlay'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderDetails from '../order-details/order-details'
import { getData, portalContainer } from '../../utils/utils'


function App() {
  const [ingredientsData, setIngredientsData] = useState(false)

  useEffect(() => {
    getData()
    .then((res) => setIngredientsData(res))
    .catch((err) => console.log(`Ошибка: ${err}`))
  }, [])

  return (
    <React.StrictMode>
      <div className={styles.app}>
        <AppHeader />
        <Main >
          {ingredientsData &&
            <React.Fragment>
              <BurgerIngredients
                data={ingredientsData.data}
                />
              <BurgerConstructor
                data={ingredientsData.data}
                />
            </React.Fragment>
          }
        </Main>
      </div>
    </React.StrictMode>
  )
}

export default App