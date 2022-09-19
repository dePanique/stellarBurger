import React, { FC, useEffect } from "react";
import styles from "./ingredient-details.module.css";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { resetCurrentIngredient } from "../../services/actions/burger-ingredients";

const IngredientDetails: FC = () => {

  const dispatch = useAppDispatch();
  const data = useAppSelector((store) => store.burgerIngredients.ingredient);

  const { success: isData }: {
    success: boolean;
  } = useAppSelector(store => store.appStore);

  useEffect(() => {

    return () => dispatch(resetCurrentIngredient());
  }, [])

  return (
    isData ? (
      <React.Fragment>
        <h3
          className={
            styles.title + " text text_type_main-large mt-10 ml-10 mr-10"
          }
        >
          Детали ингредиента
        </h3>

        <img className={styles.image} src={data?.image_large} alt="#" />

        <p
          className={
            styles.ingredientName + " text text_type_main-medium mt-4 mb-8"
          }
        >
          {data.name}
        </p>

        <ul className={styles.nutrientsRow + " text_color_inactive mb-15"}>
          <li className={styles.nutrientBlock}>
            <p className={styles.nutrientType + " text text_type_main-default"}>
              Калории,ккал
            </p>
            <p
              className={styles.NutrientValue + " text text_type_digits-default"}
            >
              {data.calories}
            </p>
          </li>

          <li className={styles.nutrientBlock + " ml-5"}>
            <p className={styles.nutrientType + " text text_type_main-default"}>
              Белки, г
            </p>
            <p
              className={styles.NutrientValue + " text text_type_digits-default"}
            >
              {data.proteins}
            </p>
          </li>

          <li className={styles.nutrientBlock + " ml-5"}>
            <p className={styles.nutrientType + " text text_type_main-default"}>
              Жиры, г
            </p>
            <p
              className={styles.NutrientValue + " text text_type_digits-default"}
            >
              {data.fat}
            </p>
          </li>

          <li className={styles.nutrientBlock + " ml-5"}>
            <p className={styles.nutrientType + " text text_type_main-default"}>
              Углеводы, г
            </p>
            <p
              className={styles.NutrientValue + " text text_type_digits-default"}
            >
              {data.carbohydrates}
            </p>
          </li>
        </ul>
      </React.Fragment>
    ) : (
      null
    )
  );
};

export default IngredientDetails;
