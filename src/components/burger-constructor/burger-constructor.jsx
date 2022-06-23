import { useState, useContext, useEffect, useReducer } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { PickedIngredients } from "../services/burgerContext";

const refillConstructor = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload]
    case 'delete':
      return state.filter((el) => el._id !== action.payload._id)
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = () => {
  const {data, bun} = useContext(PickedIngredients);
  const [modal, setModal] = useState(false);
  const [ingredients, dispatchIngredients] = useReducer(refillConstructor, []);
  const [finalPrice, setFinalPrice] = useState(0);
  const [ingredientsId, setIngredientsId] = useState()

  useEffect(() => {
    data.forEach((el) => {
      dispatchIngredients({type : 'add', payload: el});
    })
  }, [data])

  useEffect(() => {
    setFinalPrice(ingredients.reduce((prev, curr) => prev + curr.price, 0) + (bun.price * 2));
    setIngredientsId(ingredients.map((el) => el._id).concat(bun._id));
  }, [ingredients])

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
        {ingredients
          .map((element) => (
            <li key={element._id} className={styles.ingredient + " mb-4"}
                //TODO удали следующую строку на втором этапе
                onClick={() => dispatchIngredients({type: 'delete', payload: element})}>
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
        <Button type="primary" size="large" onClick={() => setModal(true)}>
          Оформить заказ
        </Button>
      </div>

      {modal && (
        <Modal handle={setModal}>
          <OrderDetails ingredientsId={ingredientsId} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
