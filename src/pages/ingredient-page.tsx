import styles from './ingredient-page.module.css'
import { useEffect } from "react";
import { FC } from "react";
import IngredientDetails from "../components/ingredient-details/ingredient-details"
import Main from "../components/main/main";
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { TIngredient } from "../utils/type";
import { setCurrentIngredient } from '../services/actions/burger-ingredients';

export const IngredientPage: FC = () => {

  const dispatch = useAppDispatch();

  const { id }: { id: string } = useParams();

  const { data }: { data: TIngredient[] } = useAppSelector((store) => store.appStore);
  const ingredient = data.find(element => element._id === id);

  //Не трогай т.к. без него react cannot update a component
  useEffect(() => {

    if (ingredient) {
      dispatch(setCurrentIngredient(ingredient));
    }
  }, [ingredient]);

  return (
    ingredient ? (
      <Main>
        <div className={styles.frame}>
          <IngredientDetails />
        </div>
      </Main>
    ) : (
      null
    )
  );
}