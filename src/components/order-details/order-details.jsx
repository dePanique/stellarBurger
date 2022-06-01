import React from "react"
import styles from './order-details.module.css'

const OrderDetails = (props) => {
  return (
    props.status &&
    <React.Fragment>
      <h2 className={styles.title}>Order details</h2>
    </React.Fragment>
  )
}

export default OrderDetails