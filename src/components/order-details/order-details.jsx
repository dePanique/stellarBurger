import React from "react"
import PropTypes from 'prop-types'
import styles from './order-details.module.css'

const OrderDetails = ({data, status}) => {

  return (
    status &&
    <React.Fragment>
      <p className={styles.orderId + ' text text_type_digits-large mt-30 mb-8'}>{data.orderId}</p>
      <p className={styles.notation + ' text text_type_main-medium mb-15'}>идентификатора заказа</p>
      <div className={styles.statusImage + ' mb-15'}></div>
      <p className={styles.orderStatus + ' text text_type_main-default mb-2'}>Ваш заказ начали готовить</p>
      <p className={styles.advice + ' text text_type_main-default text_color_inactive mb-30'}>Дождитесь готовности на орбитальной станции</p>
    </React.Fragment>
  )
}

OrderDetails.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.shape({
      orderId: PropTypes.string.isRequired,
      orderStatus: PropTypes.bool.isRequired
    }).isRequired]).isRequired,
  status: PropTypes.bool.isRequired
}
//{orderId: PropTypes.string , orderStatus: PropTypes.number}
export default OrderDetails