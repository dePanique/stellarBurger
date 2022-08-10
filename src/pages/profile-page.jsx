import { useCallback, useEffect, useState } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import styles from "./profile-page.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { logOutEnch } from "../services/actions/profile-page";
import { getUserInfoEnch, editUserInfoEnch } from "../services/actions/profile-page";

export const ProfilePage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, name } = useSelector(store => store.profilePageStore.userInfo);
  const { success : editSuccess } = useSelector(store => store.profilePageStore.editUserInfo);

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

  const cancelForm = (e) => {
    e.preventDefault();
    setNameValue(name);
    setEmailValue(email);
    setPasswordValue('');
  }

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(editUserInfoEnch(nameValue, emailValue, passwordValue));
    }, [nameValue, emailValue, passwordValue]
  )

  useEffect(() => {
    setNameValue(name);
    setEmailValue(email);
  }, [name, email])

  useEffect(() => {
    setPasswordValue('');
  }, [editSuccess])

  useEffect(() => {
    dispatch(getUserInfoEnch());
  }, [])

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
                exact to='/login'
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

      <form className={styles.inputsColumn + ` ml-15`} action="submit">
        <div className={styles.input}>
          <Input
            onChange={onNameChange}
            value={nameValue}
            name={'email'}
            placeholder="Имя"
            icon='EditIcon'
          />
        </div>

        <div className={styles.input}>
          <Input
            onChange={onEmailChange}
            value={emailValue}
            name={'name'}
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
        <div className={styles.buttonRow}>
          <div className={styles.buttonCancel}>
            <Button
              type="secondary"
              size="medium"
              onClick={(e) => cancelForm(e)}
            >
              Отмена
            </Button>
          </div>

          <div className={styles.buttonConfirm}>
            <Button
              type="primary"
              size="medium"
              onClick={(e) => submitForm(e)}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
