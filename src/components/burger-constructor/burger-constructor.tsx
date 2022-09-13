import styles from "./burger-constructor.module.css";
import { useState, useEffect, useCallback, FC } from "react";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Card from "../card/card";
import { useHistory, Link, useLocation } from 'react-router-dom';
import { getOrderNumber } from '../../services/actions/order-details';
import {
  CALC_FULLPRICE,
  REFILL_CONSTRUCTOR,
  ON_BUN_DROP,
  ON_MAIN_DROP,
} from "../../services/actions/burger-constructor";
import update from "immutability-helper";
import { appUseDispatch, appUseSelector } from "../../utils/hooks";
import { TIngredient } from "../../utils/type";

const BurgerConstructor: FC = () => {

  const location = useLocation()
  const { data, bun, finalPrice, ingredientsId } : {
    data: [];
    bun: TIngredient;
    finalPrice: number;
    ingredientsId: []
  } = appUseSelector(
    (store) => store.burgerConstructor
  );
  const { success: isAuth } = appUseSelector(store => store.authStore);
  const [constructorData, setConstructorData] = useState<[]>([]);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const dispatch = appUseDispatch();
  const history = useHistory();

  useEffect(() => {
    setIsButtonActive(!Boolean(bun.price))
  }, [bun])

  //Если изменить положение игредиентов и удалить один из них
  //то без этого хука игредиенты займут первоначальное расположение
  useEffect(() => {
    if (constructorData.length !== 0) {
      dispatch({
        type: REFILL_CONSTRUCTOR,
        payload: constructorData,
      });
    }
  }, [constructorData]);

  useEffect(() => {
    setConstructorData(data);
  }, [data])

  useEffect(() => {
    dispatch({
      type: CALC_FULLPRICE,
    });
  }, [data, bun]);

  const handleOrderButton = ():void => {
    if (isAuth) {
      dispatch(getOrderNumber(ingredientsId));
    } else {
      history.replace({ pathname: '/login' });
    }
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
    drop(main:{ listId: string}) {
      dispatch({
        type: ON_MAIN_DROP,
        payload: {
          ...main,
          listId: main.listId || Math.random().toString(36).slice(2),
        },
      });
    },
  });

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
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
            Обязательно добавьте булку ;
          </p>
        )}
      </div>

      <ul className={styles.components} ref={dropTargetMain}>
        {constructorData &&
          constructorData.map((element: TIngredient, index) => (
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

        {!isButtonActive&&isAuth ? (
          <Link
            to={{
              pathname: `/order-details`,
              state: { background: location }
            }}
          >
            <Button
              type="primary"
              size="large"
              disabled={isButtonActive}
              onClick={handleOrderButton}
              name='Оформить заказ'
            />
          </Link>
        ) : (
          <Button
            type="primary"
            size="large"
            disabled={isButtonActive}
            onClick={handleOrderButton}
            name='Оформить заказ'
          />
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;