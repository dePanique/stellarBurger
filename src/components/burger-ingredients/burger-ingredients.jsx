import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import IngredientsCollection from "./../ingredients-collection/ingredients-collection";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RESET_CURRENT_INGREDIENT } from '../../services/actions/burger-ingredients'

const BurgerIngredients = () => {
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Булки");
  const [currentScrollPos, setCurrentScrollPos] = useState(0);
  const [positionForActivation, setPositionForActivation] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let offsets = ["#bun", "#sauce", "#main"].map(
      (el) => document.querySelector(el).offsetTop
    );

    setPositionForActivation(
      offsets.map((_, index) => {
        if (index === 0) {
          return 0;
        } else if (index === 1) {
          return offsets[1] - offsets[0] - 40;
        } else {
          return offsets[2] - offsets[0] - 40;
        }
      })
    );
  }, []);

  const setCurrentTab = (e) => {
    setCurrentScrollPos(e.target.scrollTop);
    if (currentScrollPos < positionForActivation[1]) {
      setActiveTab("Булки");
    } else if (
      currentScrollPos > positionForActivation[1] &&
      currentScrollPos < positionForActivation[2]
    ) {
      setActiveTab("Соусы");
    } else if (currentScrollPos > positionForActivation[2]) {
      setActiveTab("Начинки");
    }
  };

  const closeWindow = () => {
    dispatch({
      type: RESET_CURRENT_INGREDIENT,
    })
    setModal(false);
  }

  return (
    <section className={styles.burgerIngredients + " mr-5"}>
      <h2 className={styles.title + " text text_type_main-large mt-10 mb-5"}>
        Соберите бургер
      </h2>

      <div className={styles.tabRow + " mb-10"}>
        <a href="#bun" className={styles.link + " text text_type_main-default"}>
          <Tab
            value="Булки"
            active={activeTab === "Булки"}
            onClick={setActiveTab}
          >
            Булки
          </Tab>
        </a>
        <a
          href="#sauce"
          className={styles.link + " text text_type_main-default"}
        >
          <Tab
            value="Соусы"
            active={activeTab === "Соусы"}
            onClick={setActiveTab}
          >
            Соусы
          </Tab>
        </a>
        <a
          href="#main"
          className={styles.link + " text text_type_main-default"}
        >
          <Tab
            value="Начинки"
            active={activeTab === "Начинки"}
            onClick={setActiveTab}
          >
            Начинки
          </Tab>
        </a>
      </div>

      <div className={styles.collection} onScroll={(e) => setCurrentTab(e)}>
        <IngredientsCollection type={"bun"} setModal={setModal} />

        <IngredientsCollection type={"sauce"} setModal={setModal} />

        <IngredientsCollection type={"main"} setModal={setModal} />
      </div>

      {modal && (
        <Modal handle={closeWindow}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
