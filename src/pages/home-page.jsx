import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Main from "../components/main/main";

export const HomePage = () => {
  const dispatch = useDispatch();
  const isDataAvailable = useSelector((store) => store.appStore.success);

  console.log(localStorage.getItem('refreshToken'));

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    isDataAvailable && (
      <Main>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </Main>
    )
  )
}
