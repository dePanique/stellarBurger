import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import { getData } from '../../utils/utils'
import BurgerIngridients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ModalOverlay from '../modal-overlay/modal-overlay'
import Modal from '../modal/modal'
import React, { useEffect, useState } from 'react';


function App() {
  const [ingridientsData, setIngridientsData] = useState(null)
  const [overlay, setOverlay] = useState(false)

  useEffect(() => {
    getData()
    .then((res) => { console.log(res)
      setIngridientsData(res)})
    .catch((err) => console.log(`Ошибка: ${err}`))
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <Main >
        {ingridientsData &&
        <React.Fragment>
          <BurgerIngridients {...ingridientsData}/>
          <BurgerConstructor func={() => setOverlay(!overlay)} data={ingridientsData.data}/>
        </React.Fragment>
        }
      </Main>
      <ModalOverlay func={() => setOverlay(!overlay)} isActive={overlay}>
        <Modal></Modal>
      </ModalOverlay>
    </div>
  );
}

export default App;