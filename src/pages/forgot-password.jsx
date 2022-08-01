import { useState, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import Main from "../components/main/main";
import styles from "./forgot-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { requestEmailPassReset, checkResponse } from './../utils/utils';

export const ForgotPassword = () => {

  const [emailValue, setEmailValue] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('Укажите e-mail');

  const history = useHistory();

  const onButtonClick = useCallback(
    async (e) => {
      e.preventDefault();

      //TODO запрос всегда присылает success: true
      await requestEmailPassReset(emailValue)
        .then((res) => {
          return checkResponse(res)
        })
        .catch((err) => {
          console.log(`checkResponse в requestEmailPassReset вернул ошибку ${err}`)
        })
        .then((res) => {
          if (res.success) {
            history.replace({ pathname: '/reset-password' })
          } else {
            setInputPlaceholder('E-mail не обнаружен, повторите попытку')
          }
        })
        .catch((err) => {
          console.log(`в requestEmailPassReset ошибка ${err}`);
        });
    }, [history]
  )

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