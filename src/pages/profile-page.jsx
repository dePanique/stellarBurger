import { useState, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import Main from "../components/main/main";
import styles from "./profile-page.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { requestEmailPassReset, checkResponse } from './../utils/utils';

export const ProfilePage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const history = useHistory();

  const onEmailChange = e => {
    setEmailValue(e.target.value);
  };
  const onNameChange = e => {
    setNameValue(e.target.value);
  };
  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
  };

  return (
      <div className={styles.editFrame}>

        <div className={styles.linksColumn}>
          <Link
            className={`text text_type_main-medium text_color_inactive ` + styles.link}
            to='/profile'
          >
            {'Профиль'}
          </Link>

          <Link
            className={`text text_type_main-medium text_color_inactive ` + styles.link}
            to='/profile/orders'
          >
            {'История заказов'}
          </Link>

          <Link
            className={`text text_type_main-medium text_color_inactive mb-20 ` + styles.link}
            to='/'
          >
            {'Выход'}
          </Link>

          <p className={styles.notice + ` text text_type_main-default text_color_inactive`}>
            В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
          </p>
        </div>

        <div className={styles.inputsColumn + ` ml-15 mb-20`} action="submit">
          <div className={styles.input}>
            <Input
              onChange={onEmailChange}
              value={emailValue}
              name={'name'}
              placeholder="Имя"
              icon='EditIcon'
            />
          </div>

          <div className={styles.input}>
            <Input
              onChange={onNameChange}
              value={nameValue}
              name={'email'}
              placeholder="Логин"
              icon='EditIcon'
            />
          </div>

          <div className={styles.input}>
            <Input
              onChange={onPasswordChange}
              value={passwordValue}
              name={'password'}
              placeholder="Пароль"
              icon='EditIcon'
            />
          </div>
        </div>

      </div>
  )
}
