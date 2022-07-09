import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from '../services/actions/order-details';

const BurgerConstructor = () => {
  const { data, bun, finalPrice, ingredientsId } = useSelector(store => store.burgerConstructor);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'CALC_FULLPRICE',
    })
  }, [data, bun]);

  const handleOrderButton = async () => {
    // VSC пишет что этот await не нужен, но без него, в модальном окне при повторном заказе
    // будет видно как меняется номер заказа
    await dispatch(getIngredients(ingredientsId));
    setModal(true);
  };

  const [, dropTargetBun] = useDrop({
    accept: 'bun',
    drop(bun) {
        dispatch({
          type: 'ONBUNDROP',
          payload: bun
        })
        console.log(bun)
    },
  });

  const [, dropTargetMain] = useDrop({
    accept: "main",
    drop(main) {
        dispatch({
          type: "ONMAINDROP",
          payload : {
            ...main,
            listId: main.listId || Math.random().toString(36).slice(2),
          },
        })
    },
  });

  return (
    <section className={styles.burgerConstructor + " ml-5 pl-4 pt-25"} ref={dropTargetBun} >
      <div className="topElement ml-8 mb-4" ref={dropTargetBun}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <ul className={styles.components} ref={dropTargetMain}>
        {data && data.map((element) => (
          <li
            key={element.listId}
            className={styles.ingredient + " mb-4"}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={element.name}
              price={element.price}
              thumbnail={element.image}
              handleClose={() => {
                dispatch({
                  type: 'DELETE_ITEM',
                  payload: element.listId,
                })
              }}
            />
          </li>
        ))}
      </ul>

      <div className=" ml-8 mt-4" ref={dropTargetBun}>
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
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
