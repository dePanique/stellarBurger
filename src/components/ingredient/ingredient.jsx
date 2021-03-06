import PropTypes from "prop-types";
import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { SET_CURRENT_INGREDIENT } from '../../services/actions/burger-ingredients'

const Ingredient = ({ element, handle }) => {
  const dispatch = useDispatch();

  const orderData = useSelector(
    (store) => store.burgerConstructor.ingredientsId
  );
  const quantity = orderData.filter((el) => el === element._id).length;

  const [, dragRef] = useDrag({
    type: element.type === "bun" ? "bun" : "main",
    item: element,
  });

  return (
    <div
      className={styles.box + " ml-4 mr-2 mt-6"}
      onClick={() => {
        handle(true);
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
    </div>
  );
};

Ingredient.propTypes = {
  element: PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handle: PropTypes.func.isRequired,
};

export default Ingredient;
