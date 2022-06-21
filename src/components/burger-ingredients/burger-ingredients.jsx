import { useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import IngredientsCollection from "./../ingredients-collection/ingredients-collection";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { dataTemplate } from "../../utils/constants";
import { BurgerContext } from './../services/burgerContext';

const BurgerIngredients = () => {
  const [tab, setTab] = useState("Булки");
  const [modal, setModal] = useState(false);
  const [ingredient, setIngredient] = useState({});
  const {ingredientsData : { data }} = useContext(BurgerContext);

  return (
    <section className={styles.burgerIngredients + " mr-5"}>
      <h2 className={styles.title + " text text_type_main-large mt-10 mb-5"}>
        Соберите бургер
      </h2>

      <div className={styles.tabRow + " mb-10"}>
        <a href="#bun" className={styles.link + " text text_type_main-default"}>
          <Tab value="Булки" active={tab === "Булки"} onClick={setTab}>
            Булки
          </Tab>
        </a>
        <a
          href="#sauce"
          className={styles.link + " text text_type_main-default"}
        >
          <Tab value="Соусы" active={tab === "Соусы"} onClick={setTab}>
            Соусы
          </Tab>
        </a>
        <a
          href="#main"
          className={styles.link + " text text_type_main-default"}
        >
          <Tab value="Начинки" active={tab === "Начинки"} onClick={setTab}>
            Начинки
          </Tab>
        </a>
      </div>

      <div className={styles.collection}>
        <IngredientsCollection
          type={"bun"}
          data={data}
          setIngredient={setIngredient}
          setModal={setModal}
        />

        <IngredientsCollection
          type={"sauce"}
          data={data}
          setIngredient={setIngredient}
          setModal={setModal}
        />

        <IngredientsCollection
          type={"main"}
          data={data}
          setIngredient={setIngredient}
          setModal={setModal}
        />
      </div>

      {modal && (
        <Modal handle={setModal}>
          <IngredientDetails data={ingredient} />
        </Modal>
      )}
    </section>
  );
};

// BurgerIngredients.propTypes = {
//   data: PropTypes.arrayOf(dataTemplate.isRequired).isRequired,
// };

export default BurgerIngredients;
