import { useState, useCallback, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Main from "../components/main/main";
import styles from "./forgot-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { requestEmailPassResetEnch } from "../services/actions/forgot-password";
import { useDispatch, useSelector } from "react-redux";

export const ForgotPassword = () => {

  const [emailValue, setEmailValue] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('Укажите e-mail');

  const history = useHistory();
  const dispatch = useDispatch();
  const { success: isPassReseted} = useSelector(store => store.forgotPasswordStore)

  const onButtonClick = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(requestEmailPassResetEnch(emailValue));

    }, [emailValue]
  )

  useEffect(() => {
    if (isPassReseted) history.replace({ pathname: '/reset-password' })
  }, [isPassReseted])

  const onEmailInputValueChange = e => {
    setEmailValue(e.target.value);
  };

  return (
    <Main>
      <div className={styles.column}>
        <h1 className={styles.title + ` mb-6 text text_type_main-medium`}>Восстановление пароля</h1>

        <form className={styles.form + ` mb-20`} action="submit">

          <div className={styles.input}>
            <Input
              onChange={onEmailInputValueChange}
              value={emailValue}
              name={'email'}
              placeholder={inputPlaceholder}
            />
          </div>

          <div className={styles.button}>
            <Button
              type='primary'
              size='medium'
              onClick={onButtonClick}
            >
              Восстановить
            </Button>
          </div>
        </form>

        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <Link
            className={styles.link}
            to='/login'
          >
            {' Войти'}
          </Link>
        </p>
      </div>
    </Main>
  )
}