import React from "react";
import styles from "./order-details.module.css";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const orderNumber = useSelector((store) => store.orderDetails.number);

  return (
    <React.Fragment>
      <p className={styles.orderId + " text text_type_digits-large mt-30 mb-8"}>
        {orderNumber}
      </p>
      <p className={styles.notation + " text text_type_main-medium mb-15"}>
        идентификатора заказа
      </p>
      <div className={styles.statusImage + " mb-15"}></div>
      <p className={styles.orderStatus + " text text_type_main-default mb-2"}>
        Ваш заказ начали готовить
      </p>
      <p
        className={
          styles.advice +
          " text text_type_main-default text_color_inactive mb-30"
        }
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </React.Fragment>
  );
};

export default OrderDetails;
