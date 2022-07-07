import { useState, useContext, useEffect, useReducer } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { postOrderId } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";

const BurgerConstructor = () => {
  const { data, bun, finalPrice, ingredientsId } = useSelector(store => store.burgerConstructor);
  const [modal, setModal] = useState(false);
  // const [finalPrice, setFinalPrice] = useState(0);
  // const [ingredientsId, setIngredientsId] = useState();
  const [orderId, setOrderId] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // setFinalPrice(
    //   data.reduce((prev, { price }) => prev + price, 0) + bun.price * 2
    // );
    // setIngredientsId(data.map((el) => el._id).concat(bun._id));
    dispatch({
      type: 'CALC_FULLPRICE',
    })
  }, [data]);

  const handleOrderButton = async () => {
    await postOrderId(ingredientsId)
      .then((res) => {
        dispatch({
          type: 'SET_ORDERID',
          payload: res.order.number,
        })
        setOrderId(res.order.number);
      })
      .catch((err) => console.log(err));
    setModal(true);
  };

  return (
    <section className={styles.burgerConstructor + " ml-5 pl-4 pt-25"}>
      <div className="topElement ml-8 mb-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <ul className={styles.components}>
        {data.map((element) => (
          <li
            key={element._id}
            className={styles.ingredient + " mb-4"}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={element.name}
              price={element.price}
              thumbnail={element.image}
            />
          </li>
        ))}
      </ul>

      <div className=" ml-8 mt-4">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <div className={styles.scoreRow + " mt-10 mr-4"}>
        <p className={styles.finalScore + " text text_type_digits-medium"}>
          {finalPrice}
        </p>
        <div className={styles.currencyBig + " mr-10"}></div>
        <Button
          type="primary"
          size="large"
          onClick={() => handleOrderButton()}
        >
          Оформить заказ
        </Button>
      </div>

      {modal && (
        <Modal handle={setModal}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
