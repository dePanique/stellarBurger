import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Main from "../components/main/main";
import { appUseSelector } from "../utils/hooks";


export const HomePage: FC = () => {

  const isDataAvailable = appUseSelector((store) => store.appStore.success);

  return (
    isDataAvailable ? (
      <Main>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </Main>
    ) : (
      null
    )
  )
}
