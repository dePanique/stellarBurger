import React, { FC } from "react";
import Ingredient from "../ingredient/ingredient";
import styles from "./ingredients-collection.module.css";
import { useAppSelector } from "../../utils/hooks";
import { IIngredientsCollection } from "../../utils/type";

const IngredientsCollection: FC<IIngredientsCollection> = ({ type }) => {

  const ingredientType: { [name: string]: string } = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  const { data } = useAppSelector((store) => store.appStore);

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
            <Ingredient key={element._id} element={element} />
          )
      )}
    </React.Fragment>
  );
};

export default IngredientsCollection;
