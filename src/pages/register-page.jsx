import { useState, useCallback, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import Main from "../components/main/main"
import styles from "./register.module.css"
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Button, Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { signIn } from "../services/actions/profileInfo";

export const RegisterPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const {success} = useSelector((store) => store.profileStore)

  const onButtonClick = useCallback(
    async (e) => {
      e.preventDefault()
      await dispatch(signIn(emailValue, passValue, nameValue))
    }, [history, emailValue, passValue, nameValue]
  )

  useEffect(() => {
    if (success) {
      history.replace({ pathname: '/' })
    } else {
      setEmailValue('smthn went wrng =(')
    }
  }, [success])

  const onEmailInputValueChange = e => {
    setEmailValue(e.target.value);
  };

  const onPassInputValueChange = e => {
    setPassValue(e.target.value);
  };

  const onNameInputValueChange = e => {
    setNameValue(e.target.value);
  };

  return (
    <Main>
      <div className={styles.column}>
        <h1 className={styles.title + ` mb-6 text text_type_main-medium`}>Регистрация</h1>

        <form className={styles.form + ` mb-20`} action="submit">
          <Input
            onChange={onNameInputValueChange}
            type={'text'}
            placeholder={'Имя'}
            value={nameValue}
            name={'userName'}
          />

          <EmailInput
            onChange={onEmailInputValueChange}
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
              onClick={onButtonClick}
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