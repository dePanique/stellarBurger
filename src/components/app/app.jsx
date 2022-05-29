import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import { getData } from '../../utils/utils'
import BurgerIngridients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import React, { useEffect, useState } from 'react';


function App() {
  const [ingridientsData, setIngridientsData] = useState(null)

  useEffect(() => {
    getData()
    .then((res) => setIngridientsData(res))
    .catch((err) => console.log(`Ошибка: ${err}`))
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <Main >
        {ingridientsData &&
        <React.Fragment>
          <BurgerIngridients {...ingridientsData}/>
          <BurgerConstructor {...ingridientsData}/>
        </React.Fragment>
        }
      </Main>
    </div>
  );
}

export default App;