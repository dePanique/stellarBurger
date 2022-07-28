import { useState } from "react";
import Main from "../components/main/main"
import styles from "./login-page.module.css"
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";


export const LoginPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passValue, setPassValue] = useState('');

  const onEmailInputValueChange = e => {
    setEmailValue(e.target.value);
  };

  const onPassInputValueChange = e => {
    setPassValue(e.target.value);
  };

  return (
    <Main>
      <div className={styles.column}>
        <h1 className={styles.title + ` mb-6 text text_type_main-medium text_color_active`}>Вход</h1>

        <form className={styles.form + ` mb-20`} action="submit">
          <EmailInput
            onChange={onEmailInputValueChange}
            value={emailValue}
            name={'email'}
            placeholder={'0'}
          />

          <PasswordInput
            onChange={onPassInputValueChange}
            value={passValue}
            name={'password'}
          />

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
          <a className={styles.link} href="/"> Зарегистрироваться</a>
        </p>

        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <a className={styles.link} href="/"> Восстановить пароль</a>
        </p>
      </div>
    </Main>
  );
}