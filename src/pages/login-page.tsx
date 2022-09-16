import { FC, useState, useCallback, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import Main from "../components/main/main";
import styles from "./login-page.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { logInEnch } from "../services/actions/login-page";
import { authenticationEnch } from "../services/actions/auth";
import { appUseDispatch } from "../utils/hooks";
import { requestNewPassReset } from "../services/actions/forgot-password";

export const LoginPage: FC = () => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passValue, setPassValue] = useState<string>('');

  const dispatch = appUseDispatch();
  const history = useHistory();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(logInEnch(emailValue, passValue));
    }, [history, emailValue, passValue]
  );

  const onEmailInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const onPassInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassValue(e.target.value);
  };

  useEffect(() => {
    dispatch(requestNewPassReset())
    dispatch(authenticationEnch());
  }, [])

  return (
    <Main>
      <div className={styles.column}>
        <h1 className={styles.title + ` mb-6 text text_type_main-medium`}>Вход</h1>

        <form className={styles.form + ` mb-20`} action="submit" onSubmit={onSubmit}>
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
            />
          </fieldset>

          <div className={styles.button}>
            <Button
              type='primary'
              size='medium'
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