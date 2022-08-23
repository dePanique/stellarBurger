import { useCallback, useEffect, useState } from "react";
import styles from './edit-profile.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { editUserInfoEnch } from "../services/actions/profile-page";
import { useDispatch, useSelector } from "react-redux";

export const EditProfile = () => {

  const dispatch = useDispatch();
  
  const [emailValue, setEmailValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { email, name } = useSelector(store => store.profilePageStore.userInfo);
  const { success: editSuccess } = useSelector(store => store.profilePageStore.editUserInfo);

  const onEmailChange = e => {
    setEmailValue(e.target.value);

    if (e.target.value === email) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const onNameChange = e => {
    setNameValue(e.target.value);

    if (e.target.value === name) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
    setIsEditing(true);
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
    setIsEditing(false);
  }, [editSuccess])

  return (
    <form className={styles.inputsColumn + ` ml-15`} action="submit" onSubmit={submitForm}>
      <div className={styles.inputsBox}>
        <div className={styles.input}>
          <Input
            onChange={onNameChange}
            value={nameValue}
            name={'name'}
            placeholder="Имя"
            icon='EditIcon'
          />
        </div>

        <div className={styles.input + ` mt-6 mb-6`}>
          <Input
            onChange={onEmailChange}
            value={emailValue}
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
      {isEditing && <div className={styles.buttonRow}>
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

          >
            Сохранить
          </Button>
        </div>
      </div>}
    </form>
  )
}