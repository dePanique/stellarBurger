import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import IngredientDetails from "../components/ingredient-details/ingredient-details"
import Main from "../components/main/main";
import { SET_CURRENT_INGREDIENT } from "../services/actions/burger-ingredients";
import styles from './ingredient-page.module.css'
import { useParams } from 'react-router-dom'

export const IngredientPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { data } = useSelector((store) => store.appStore);
  const ingredient = data.find(element => element._id === id);

  //Не трогай т.к. без него react cannot update a component
  useEffect(() => {

    if (ingredient) {
      dispatch({
        type: SET_CURRENT_INGREDIENT,
        payload: ingredient
      })
    }
  }, [ingredient])

  return (
    ingredient && <Main>
      <div className={styles.frame}>
        <IngredientDetails />
      </div>
    </Main>
  )
}