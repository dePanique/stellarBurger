import { useState, useEffect, useCallback } from "react";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import Card from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import { getOrderNumber } from '../../services/actions/order-details';
import update from "immutability-helper";
import {
  CALC_FULLPRICE,
  REFILL_CONSTRUCTOR,
  ON_BUN_DROP,
  ON_MAIN_DROP,
} from "../../services/actions/burger-constructor";

const BurgerConstructor = () => {
  const { data, bun, finalPrice, ingredientsId } = useSelector(
    (store) => store.burgerConstructor
  );
  const [modal, setModal] = useState(false);
  const [constructorData, setConstructorData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CALC_FULLPRICE,
    });
    setConstructorData(data);
    console.log(localStorage.getItem('refreshToken'));
  }, [data, bun]);

  useEffect(() => {
    dispatch({
      type: REFILL_CONSTRUCTOR,
      payload: constructorData,
    });
  }, [constructorData]);

  const handleOrderButton = async () => {
    // VSC пишет что этот await не нужен, но без него, в модальном окне при повторном заказе
    // будет видно как меняется номер заказа
    await dispatch(getOrderNumber(ingredientsId));
    setModal(true);
  };

  const [, dropTargetBun] = useDrop({
    accept: "bun",
    drop(bun) {
      dispatch({
        type: ON_BUN_DROP,
        payload: bun,
      });
    },
  });

  const [, dropTargetMain] = useDrop({
    accept: "main",
    drop(main) {
      dispatch({
        type: ON_MAIN_DROP,
        payload: {
          ...main,
          listId: main.listId || Math.random().toString(36).slice(2),
        },
      });
    },
  });

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setConstructorData((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <section
      className={styles.burgerConstructor + " ml-5 pl-4 pt-25"}
      ref={dropTargetBun}
    >
      <div className="topElement ml-8 mb-4" ref={dropTargetBun}>
        {bun.type ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <p className={`${styles.notice} text text_type_main-medium`}>
            Обязательно добавьте булку ;)
          </p>
        )}
      </div>

      <ul className={styles.components} ref={dropTargetMain}>
        {constructorData &&
          constructorData.map((element, index) => (
            <Card
              key={element.listId}
              index={index}
              id={element.listId}
              element={element}
              moveCard={moveCard}
            />
          ))}
      </ul>

      <div className=" ml-8 mt-4" ref={dropTargetBun}>
        {bun.type ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          false
        )}
      </div>

      <div className={styles.scoreRow + " mt-10 mr-4"}>
        <p className={styles.finalScore + " text text_type_digits-medium"}>
          {finalPrice ? finalPrice : 0}
        </p>
        <div className={styles.currencyBig + " mr-10"}></div>
        <Button type="primary" size="large" onClick={() => bun.price && handleOrderButton()}>
          Оформить заказ
        </Button>
      </div>

      {modal && (
        <Modal handle={setModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
