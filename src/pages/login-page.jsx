import { useState, useCallback, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import Main from "../components/main/main";
import styles from "./login-page.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { logInEnch, updateAccessTokenEnch } from "../services/actions/log-in";

export const LoginPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passValue, setPassValue] = useState('');

  const { success, refreshToken, accessToken } = useSelector(store => store.logInStore);
  const dispatch = useDispatch();
  const history = useHistory();

  const onButtonClick = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logInEnch(emailValue, passValue));
    }, [history, emailValue, passValue]
  );

  useEffect(() => {
    let refreshTimer;
    if (success) {
      history.replace({ pathname: '/' })
      refreshTimer = setTimeout(function callIt() {
        dispatch(updateAccessTokenEnch(refreshToken))
        setTimeout(callIt, 15000)
      }, 15000);
    } else {
      clearTimeout(refreshTimer);
    }
  }, [accessToken]);

  const onEmailInputValueChange = e => {
    setEmailValue(e.target.value);
  };

  const onPassInputValueChange = e => {
    setPassValue(e.target.value);
  };

  return (
    <Main>
      <div className={styles.column}>
        <h1 className={styles.title + ` mb-6 text text_type_main-medium`}>Вход</h1>

        <form className={styles.form + ` mb-20`} action="submit">
          <fieldset className={styles.inputColumn}>
              <Input
                onChange={onEmailInputValueChange}
                value={emailValue}
                name={'email'}
                placeholder='E-mail'
              />

              <PasswordInput
                onChange={onPassInputValueChange}
                value={passValue}
                name={'password'}
                icon='ShowIcon'
              />
          </fieldset>

          <div className={styles.button}>
            <Button
              type='primary'
              size='medium'
              onClick={onButtonClick}
            >
              Вход
            </Button>
          </div>
        </form>

        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
          <Link
            className={styles.link}
            to='/register'
          >
            {' Зарегистрироваться'}
          </Link>
        </p>

        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link
            className={styles.link}
            to='/forgot-password'
          >
            {' Восстановить пароль'}
          </Link>
        </p>
      </div>
    </Main>
  );
}