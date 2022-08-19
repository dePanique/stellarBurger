import { Route, Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

//Делает роуты для только авторизованных или только неавторизованных юзеров
export const ProtectedRoute = ({path, children, unAuthOnly, passReset, ...rest}) => {
  const history = useHistory()

  const { success : isAuth } = useSelector(store => store.authStore);
  const { failed: isAccessUpdateFailed } = useSelector(store => store.logInStore.accessTokenStatus)
  const { success: isPassReseted} = useSelector(store => store.forgotPasswordStore)
  let token = localStorage.getItem('refreshToken');
  const location = useLocation()

  if (token && !unAuthOnly) {

    return <Route
      children={children}
      {...rest}
      />
  }
console.log(3);
  /*** роуты только для неавторизованных ***/

  //Не пускаем авторизованных
  if (unAuthOnly && token) {
    // console.log(history);
    history.goBack()
  }

  //Не допускаем неавторизованных
  if (unAuthOnly && !isAuth) {

    //Не допускаем без прохождения /forgot-password
    if (passReset && !isPassReseted) {

      return <Redirect to='/forgot-password'/>
    }

    //Запускаем если невторизован
    return (
      <Route
      children={children}
      {...rest}
      />
    )
  }

  /*** роуты только для авторизованных ***/

  // Роут для неавторизованного юзера
  // if (!isAuth || isAccessUpdateFailed) {

  //   return <Redirect to='/login' />
  // }

  //Роут для авторизованного юзера

}

export default ProtectedRoute;