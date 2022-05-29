import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import BurgerIngridients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
//import { hardCode } from '../../utils/data'
import { useEffect, useState } from 'react';

function App() {

  const dataUrl = 'https://norma.nomoreparties.space/api/'
  const [ingridientsData, setIngridientsData] = useState(null)

  function getData (func) {
    return fetch(`${dataUrl}ingredients`, {
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) return res.json()

    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .then((res) => {
    
  })

 }


  useEffect(() => {

  })



  return (
    <div className={styles.app}>
      <AppHeader />
      <Main >
        {/* {<BurgerIngridients data={ingridientsData}/>} */}
        {/* <BurgerConstructor data={data}/> */}
      </Main>
    </div>
  );
}

export default App;