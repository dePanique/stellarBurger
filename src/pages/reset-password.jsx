import styles from "./reset-password.module.css";
import { useState, useCallback } from "react";
import { Link, useHistory } from 'react-router-dom';
import Main from "../components/main/main";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { applyNewPass, checkResponse } from "./../utils/utils"

export const ResetPassword = () => {
  const [newPassValue, setNewPassValue] = useState('');
  const [confirmPassValue, setConfirmPassValue] = useState('');

  const history = useHistory();

  const onButtonClick = useCallback(
    (e) => {
      e.preventDefault();

      applyNewPass(newPassValue, confirmPassValue)
      .then((res) => {
        return checkResponse(res)
      })
      .catch((err) => {
        console.log(`ошибка checkResponse в ResetPassword ${err}`);
      })
      history.replace({ pathname: '/' })
    }, [history, newPassValue, confirmPassValue]
  )
  const onNewPassValueChange = e => {
    setNewPassValue(e.target.value);
  };

  const onConfirmPassValueChange = e => {
    setConfirmPassValue(e.target.value);
  };

  return (
    <Main>
      <div className={styles.column}>
        <h1 className={styles.title + ` mb-6 text text_type_main-medium`}>Восстановление пароля</h1>

        <form className={styles.form + ` mb-20`} action="submit">

          <fieldset className={styles.inputColumn}>
            <Input
              onChange={onNewPassValueChange}
              value={newPassValue}
              name={'newEmail'}
              placeholder='Введите новый пароль'
              icon='ShowIcon'
            />

            <Input
              onChange={onConfirmPassValueChange}
              value={confirmPassValue}
              name={'confirmEmail'}
              placeholder='Введите код из письма'
            />
          </fieldset>

          <div className={styles.button}>
            <Button
              type='primary'
              size='medium'
              onClick={onButtonClick}
            >
              Сохранить
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