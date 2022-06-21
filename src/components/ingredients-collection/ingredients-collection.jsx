import React from "react";
import PropTypes from "prop-types";
import Ingredient from "../ingredient/ingredient";
import styles from "./ingredients-collection.module.css";
import { dataTemplate } from "../../utils/constants";

const IngredientsCollection = ({ setIngredient, setModal, type, data }) => {
  const ingredientType = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };
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
            <Ingredient
              key={element._id}
              element={element}
              setIngredient={setIngredient}
              handle={setModal}
            />
          )
      )}
    </React.Fragment>
  );
};

IngredientsCollection.propTypes = {
  setIngredient: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataTemplate.isRequired).isRequired,
};

export default IngredientsCollection;
