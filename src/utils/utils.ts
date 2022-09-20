import { TIngredient } from "./type"

export const calcBurgerPriceFeedPage = (ingredients: string[], data: TIngredient[]) => {
  let summ = 0
  ingredients.forEach(el => {
    data.find((dataEl) => {
      if (el === dataEl._id) {
        summ += dataEl.price
      }
    })
  })
  return summ
}
