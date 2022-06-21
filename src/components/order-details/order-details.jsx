import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import { postOrderId } from "../../utils/utils";

const OrderDetails = ({ingredientsId}) => {
console.log(ingredientsId)
const [orderId, setOrderId] = useState(false);

  useEffect(()=> {
    postOrderId(ingredientsId)
    .then((res) => {
      console.log(res)
      setOrderId(res.order.number)
    })
    .catch((err) => console.log(err))
  }, [])

  return (
    <React.Fragment>
      <p className={styles.orderId + " text text_type_digits-large mt-30 mb-8"}>
        {orderId}
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

// OrderDetails.propTypes = {
//   data: PropTypes.object.isRequired,
// };

export default OrderDetails;
