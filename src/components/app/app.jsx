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
  const [overlayStatus, setOverlayStatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [ingredientDetailStatus, setIngredientDetailStatus] = useState({data: false, status: false})
  const [orderDetailsStatus, setOrderDetailsStatus] = useState({data: {orderId: '034536', orderStatus: true}, status: false})

  useEffect(() => {
    getData()
    .then((res) => setIngredientsData(res))
    .catch((err) => console.log(`Ошибка: ${err}`))
  }, [])

  useEffect(() => {
    if (!modalStatus) {
      setIngredientDetailStatus({data: false, status: false})
      setOrderDetailsStatus({data: {orderId: '034536', orderStatus: true}, status: false})
    }
  }, [modalStatus])

  const handleModalWithOverlay = (status) => {
    setOverlayStatus(status)
    setModalStatus(status)
  }

  const handleIngredientDetails = (status, deatilStatus, data) => {
    handleModalWithOverlay(status)
    setIngredientDetailStatus({data: {...data}, status: deatilStatus})
  }

  const handleOrderDetails = (status) => {
    handleModalWithOverlay(status)
    setOrderDetailsStatus({...orderDetailsStatus, status: status})
  }

  return (
    <React.StrictMode>
      <div className={styles.app}>
        <AppHeader />
        <Main >
          {ingredientsData &&
            <React.Fragment>
              <BurgerIngredients
                handleIngredientsDetails={handleIngredientDetails}
                data={ingredientsData.data}
                />
              <BurgerConstructor
                handleOrderDetails={handleOrderDetails}
                data={ingredientsData.data}
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
          <IngredientDetails {...ingredientDetailStatus}/>
          <OrderDetails {...orderDetailsStatus}/>
        </Modal>
      </div>
    </React.StrictMode>
  )
}

export default App