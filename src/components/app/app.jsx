import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import { getData, portalContainer } from '../../utils/utils'
import BurgerIngridients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import ModalOverlay from '../modal-overlay/modal-overlay'
import Modal from '../modal/modal'
import React, { useEffect, useState } from 'react'

function App() {
  const [ingridientsData, setIngridientsData] = useState(null)
  const [overlayStatus, setOverlayStatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)

  useEffect(() => {
    getData()
    .then((res) => { console.log(res)
      setIngridientsData(res)})
    .catch((err) => console.log(`Ошибка: ${err}`))
  }, [])

  const handleModal = (status) => {
    setOverlayStatus(status)
    setModalStatus(status)
  }

  return (
    <React.StrictMode>
      <div className={styles.app}>
        <AppHeader />
        <Main >
          {ingridientsData &&
            <React.Fragment>
              <BurgerIngridients
                handleIngridientsDetails={handleModal}
                data={ingridientsData.data}
                />
              <BurgerConstructor
                handleOrderDetails={handleModal}
                data={ingridientsData.data}
                />
            </React.Fragment>
          }
        </Main>
        <ModalOverlay
          handleOverlay={handleModal}
          isActive={overlayStatus}
          portalContainer={portalContainer}
          />
        <Modal
          closeModal={handleModal}
          isActive={modalStatus}
          portalContainer={portalContainer}
          />
      </div>
    </React.StrictMode>
  )
}

export default App