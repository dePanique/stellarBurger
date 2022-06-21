import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { dataTemplate } from "../../utils/constants";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { PickedIngredients } from "../services/burgerContext";
import { postOrderId } from "../../utils/utils";

const BurgerConstructor = () => {
  const {data, bun} = useContext(PickedIngredients);
  const [modal, setModal] = useState(false);
  const ingredientsId = data.map((el) => el._id).concat(bun._id)
  //console.log(ingredientsId)


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
        {data
          .filter((element) => element.type !== "bun")
          .map((element) => (
            <li key={element._id} className={styles.ingredient + " mb-4"}>
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
          610
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

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(dataTemplate.isRequired).isRequired,
// };

export default BurgerConstructor;
