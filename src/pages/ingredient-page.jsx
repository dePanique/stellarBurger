import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import IngredientDetails from "../components/ingredient-details/ingredient-details"
import Main from "../components/main/main";
import { getIngredients } from "../services/actions/app";
import { SET_CURRENT_INGREDIENT } from "../services/actions/burger-ingredients";
import styles from './ingredient-page.module.css'
import { useParams } from 'react-router-dom'

export const IngredientPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data } = useSelector((store) => store.appStore);
  console.log(id);
  const ingredient = data.find(element => element._id === id);

  dispatch({
    type: SET_CURRENT_INGREDIENT,
    payload: ingredient
  })


  return (
    <Main>
      <div className={styles.frame}>
        <IngredientDetails/>
      </div>
    </Main>
  )
}