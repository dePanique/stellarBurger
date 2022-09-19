import styles from "./register.module.css"
import { useState, useCallback, useEffect, FC } from "react";
import { Link, useHistory } from 'react-router-dom';
import Main from "../components/main/main"
import {
  PasswordInput,
  Button, Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { signIn } from "../services/actions/register-page";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

export const RegisterPage: FC = () => {

  const [emailValue, setEmailValue] = useState<string>('');
  const [passValue, setPassValue] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');

  const dispatch = useAppDispatch();
  const history = useHistory();
  const {success} = useAppSelector((store) => store.signInStore);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(signIn(emailValue, passValue, nameValue));
    }, [history, emailValue, passValue, nameValue]
  );

  useEffect(() => {
    if (success) history.replace({ pathname: '/' });
  }, [success]);

  const onEmailInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const onPassInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassValue(e.target.value);
  };

  const onNameInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  return (
    <Main>
      <div className={styles.column}>
        <h1 className={styles.title + ` mb-6 text text_type_main-medium`}>Регистрация</h1>

        <form className={styles.form + ` mb-20`} action="submit" onSubmit={onSubmit}>
          <Input
            onChange={onNameInputValueChange}
            type={'text'}
            placeholder={'Имя'}
            value={nameValue}
            name={'userName'}
          />

          <Input
            onChange={onEmailInputValueChange}
            type={'text'}
            placeholder={'E-mail'}
            value={emailValue}
            name={'email'}
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
              Зарегистрироваться
            </Button>
          </div>
        </form>

        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link
            className={styles.link}
            to='/login'
          >
            {' Войти'}
          </Link>
        </p>
      </div>
    </Main>
  );
}