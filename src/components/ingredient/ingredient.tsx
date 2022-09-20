import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import { IIngredient } from "../../utils/type";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { setCurrentIngredient } from "../../services/actions/burger-ingredients";

const Ingredient: FC<IIngredient> = ({ element }) => {

  const dispatch = useAppDispatch();
  const location = useLocation();

  const { ingredientsID: orderData } = useAppSelector(
    (store) => store.burgerConstructor
  );

  const quantity = orderData.filter((el) => el === element._id).length;

  const [, dragRef] = useDrag({
    type: element.type === "bun" ? "bun" : "main",
    item: element,
  });

  return (
    <Link
      to={{
        pathname: `/ingredients/${element._id}`,
        state: { background: location }
      }}

      className={styles.box + " ml-4 mr-2 mt-6 text text_type_main-default"}
      onClick={() => {
        dispatch(setCurrentIngredient(element));
      }}
      ref={dragRef}
    >
      <Counter count={quantity} size="default" />
      <img className="pl-4 pr-4 mb-1" src={element.image} alt="#" />
      <p className="text text_type_digits-default mr-2">{element.price}</p>
      <CurrencyIcon type="primary" />
      <p className={styles.itemName + " text text_type_main-default mt-1"}>
        {element.name}
      </p>
    </Link>
  );
};

export default Ingredient;
