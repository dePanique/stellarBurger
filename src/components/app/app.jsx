import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import { getData, portalContainer } from '../../utils/utils'
import BurgerIngridients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import ModalOverlay from '../modal-overlay/modal-overlay'
import Modal from '../modal/modal'
import IngridientDetails from '../ingridient-details/ingridient-details'
import React, { useEffect, useState } from 'react'

function App() {
  const [ingridientsData, setIngridientsData] = useState(null)
  const [overlayStatus, setOverlayStatus] = useState(true)
  const [modalStatus, setModalStatus] = useState(true)
  const [currentIngridient, setCurrentIngridient] = useState (null)

  useEffect(() => {
    getData()
    .then((res) => { console.log(res)
      setIngridientsData(res)})
    .catch((err) => console.log(`Ошибка: ${err}`))
  }, [])

  const handleModal = (status, ingridientData) => {
    setOverlayStatus(status)
    setModalStatus(status)
    setCurrentIngridient(ingridientData)
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
                setCurrentIngridient={setCurrentIngridient}
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
        >
          <IngridientDetails data={currentIngridient}/>
        </Modal>
      </div>
    </React.StrictMode>
  )
}

export default App