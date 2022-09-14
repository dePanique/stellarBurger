import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { SET_CURRENT_INGREDIENT } from '../../services/actions/burger-ingredients'
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from "../../utils/type";
import { FC } from "react";
import { appUseDispatch, appUseSelector } from "../../utils/hooks";

interface IIngredient {
  element: TIngredient
}

const Ingredient: FC<IIngredient> = ({ element }) => {

  const dispatch = appUseDispatch();
  const location = useLocation();

  const { ingredientsId : orderData } : {
    ingredientsId: (undefined | string)[]
  } = appUseSelector(
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
        dispatch({
          type: SET_CURRENT_INGREDIENT,
          payload: element,
        });
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