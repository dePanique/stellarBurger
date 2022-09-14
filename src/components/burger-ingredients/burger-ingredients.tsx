import { useState, BaseSyntheticEvent } from "react";
import styles from "./burger-ingredients.module.css";
import IngredientsCollection from "../ingredients-collection/ingredients-collection";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";

const BurgerIngredients = () => {

  const [activeTab, setActiveTab] = useState("Булки");
  const [currentScrollPos, setCurrentScrollPos] = useState(0);
  const [positionForActivation, setPositionForActivation] = useState<(number | undefined)[]>();

  useEffect(() => {
    let offsets: (number | undefined)[] = [];

    offsets = ["#bun", "#sauce", "#main"].map((el: string) =>
      document.querySelector<HTMLElement>(el)?.offsetTop).map((_, index) => {
        if (index === 0) {
          return 0;
        } else if (index === 1) {
          return offsets[1]! - offsets[0]! - 40;
        } else {
          return offsets[2]! - offsets[0]! - 40;
        }
      });

    setPositionForActivation(offsets);
  }, []);

  const setCurrentTab = (e: BaseSyntheticEvent<HTMLDivElement>) => {
    setCurrentScrollPos(e.target.scrollTop);

    if (positionForActivation && currentScrollPos < positionForActivation[1]!) {
      setActiveTab("Булки");
    } else if (
      positionForActivation && currentScrollPos > positionForActivation[1]! &&
      positionForActivation && currentScrollPos < positionForActivation[2]!
    ) {
      setActiveTab("Соусы");
    } else if (positionForActivation && currentScrollPos > positionForActivation[2]!) {
      setActiveTab("Начинки");
    }
  };

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

      <div className={styles.collection} onScroll={(e: any) => setCurrentTab(e)}>
        <IngredientsCollection type={"bun"} />

        <IngredientsCollection type={"sauce"} />

        <IngredientsCollection type={"main"} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
