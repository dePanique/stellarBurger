import React from "react";
import PropTypes from "prop-types";
import Ingredient from "../ingredient/ingredient";
import styles from "./ingredients-collection.module.css";
import { useSelector } from "react-redux";

const IngredientsCollection = ({ setModal, type }) => {
  const ingredientType = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  const { data } = useSelector((store) => store.appStore);

  return (
    <React.Fragment>
      <p
        id={type}
        className={styles.ingredientsType + " text text_type_main-medium mt-10"}
      >
        {ingredientType[type]}
      </p>
      {data.map(
        (element) =>
          element.type === type && (
            <Ingredient key={element._id} element={element} handle={setModal} />
          )
      )}
    </React.Fragment>
  );
};

IngredientsCollection.propTypes = {
  setModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientsCollection;
