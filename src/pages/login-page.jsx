import { useState, useCallback } from "react";
import { Link, useHistory } from 'react-router-dom';
import Main from "../components/main/main";
import styles from "./login-page.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";

export const LoginPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passValue, setPassValue] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const onButtonClick = useCallback(
    () => {
      history.replace({ pathname: '/' })
    }, [history]
  )

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