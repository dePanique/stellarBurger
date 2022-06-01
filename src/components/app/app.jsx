import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import { getData, portalContainer } from '../../utils/utils'
import BurgerIngridients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import ModalOverlay from '../modal-overlay/modal-overlay'
import Modal from '../modal/modal'
import IngridientDetails from '../ingridient-details/ingridient-details'
import OrderDetails from '../order-details/order-details'
import React, { useEffect, useState } from 'react'

function App() {
  const [ingridientsData, setIngridientsData] = useState(null)
  const [overlayStatus, setOverlayStatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [ingredientDetailStatus, setIngredientDetailStatus] = useState({data: false, status: false})
  const [orderDetailsStatus, setOrderDetailsStatus] = useState({data: false, status: false})

  useEffect(() => {
    getData()
    .then((res) => setIngridientsData(res))
    .catch((err) => console.log(`Ошибка: ${err}`))
  }, [])

  useEffect(() => {
    if (!modalStatus) {
      setIngredientDetailStatus({data: false, status: false})
      setOrderDetailsStatus({data: false, status: false})
    }
  }, [modalStatus])

  const handleModalWithOverlay = (status) => {
    setOverlayStatus(status)
    setModalStatus(status)
  }

  const handleIngridientDetails = (status, deatilStatus, data) => {
    handleModalWithOverlay(status)
    setIngredientDetailStatus({data: {...data}, status: deatilStatus})
  }

  const handleOrderDetails = (status, orderStatus, data) => {
    handleModalWithOverlay(status)
    setOrderDetailsStatus({data: data, status: orderStatus})
  }

  return (
    <React.StrictMode>
      <div className={styles.app}>
        <AppHeader />
        <Main >
          {ingridientsData &&
            <React.Fragment>
              <BurgerIngridients
                handleIngridientsDetails={handleIngridientDetails}
                data={ingridientsData.data}
                />
              <BurgerConstructor
                handleOrderDetails={handleOrderDetails}
                data={ingridientsData.data}
                />
            </React.Fragment>
          }
        </Main>
        <ModalOverlay
          handleOverlay={handleModalWithOverlay}
          isActive={overlayStatus}
          portalContainer={portalContainer}
          />
        <Modal
          closeModal={handleModalWithOverlay}
          isActive={modalStatus}
          portalContainer={portalContainer}
        >
          <IngridientDetails {...ingredientDetailStatus}/>
          <OrderDetails {...orderDetailsStatus}/>
        </Modal>
      </div>
    </React.StrictMode>
  )
}

export default App