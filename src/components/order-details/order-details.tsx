import styles from "./order-details.module.css";
import React, { FC } from "react";
import { appUseSelector } from "../../utils/hooks";

const OrderDetails: FC = () => {

  const {
    number: orderNumber,
    request,
    failed,
    name,
  }: {
    number: string;
    request: boolean;
    failed: boolean;
    name: string;
  } = appUseSelector((store) => store.orderDetails);

  return (
    <React.Fragment>
      <p className={styles.orderId + " text text_type_digits-large mt-30 mb-8"}>
        {orderNumber ? orderNumber : '.....'}
      </p>
      <p className={styles.notation + " text text_type_main-medium mb-15"}>
        {orderNumber && 'идентификатора заказа'}
        {request && 'ожидайте идентификатор заказа'}
        {failed && 'не удалось сформировать заказ'}

      </p>
      <div className={styles.statusImage + " mb-15"}></div>
      <p className={styles.orderStatus + " text text_type_main-default mb-2"}>
        {orderNumber && 'Ваш заказ начали готовить'}
        {request && 'Ожидайте идентификатор заказа'}
        {failed && 'Ошибка. Повторите заказ'}
      </p>
      <p
        className={
          styles.advice +
          " text text_type_main-default text_color_inactive mb-30"
        }
      >
        {orderNumber && 'Дождитесь готовности на орбитальной станции'}
        {failed && 'Попробуйте повторить заказ на главной странице'}
      </p>
    </React.Fragment>
  );
};

export default OrderDetails;
