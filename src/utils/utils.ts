import { AxiosResponse } from "axios"
import { deleteCookie, setCookie, setCookieTime } from "./cookies"
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

export const handleTokenRequest = (config: AxiosResponse) => {
  console.log('interceptor response', config);
  if (config.data.accessToken) {
    deleteCookie('accessToken');
    setCookie('accessToken', config.data.accessToken, { expires: 1140 });

    deleteCookie('expire');
    setCookieTime();
  }

  if (config.data.accessToken) {
    localStorage.clear()
    localStorage.setItem('refreshToken', config.data.refreshToken)
  }
}