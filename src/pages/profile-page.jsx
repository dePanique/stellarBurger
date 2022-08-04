import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./profile-page.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { logOutEnch } from "../services/actions/profile-page";


export const ProfilePage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();
  const { success } = useSelector(store => store.logInStore);


  const onEmailChange = e => {
    setEmailValue(e.target.value);
  };

  const onNameChange = e => {
    setNameValue(e.target.value);
  };

  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOutEnch(localStorage.getItem('refreshToken')));
  };

  useEffect(() => {
    if (success) {

    } else {
      //history.replace({ pathname: '/' });
    }
  }, [success])

  return (
    <div className={styles.editFrame}>
      <div className={styles.linksColumn}>
        <nav className="mb-20">
          <ul className={styles.linksColumn + ` text_color_primary `}>
            <li className={styles.listElement}>
              <NavLink
                exact to={{ pathname: '/profile' }}
                className={styles.link + ' text text_type_main-medium text_color_inactive '}
                activeClassName={styles.colorPrimary}
              >
                {'Профиль'}
              </NavLink>
            </li>

            <li className={styles.listElement}>
              <NavLink
                exact to='/profile/orders'
                className={styles.link + ' text text_type_main-medium text_color_inactive '}
                activeClassName={styles.colorPrimary}
              >
                {'История заказов'}
              </NavLink>
            </li>

            <li className={styles.listElement}>
              <NavLink
                exact to='/'
                className={styles.link + ' text text_type_main-medium text_color_inactive '}
                activeClassName={styles.colorPrimary}
                onClick={(e) => handleLogOut(e)}
              >
                {'Выход'}
              </NavLink>
            </li>
          </ul>
        </nav>

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
