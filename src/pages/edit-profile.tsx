import styles from './edit-profile.module.css';
import { useCallback, useEffect, useState } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { editUserInfoEnch } from "../services/actions/profile-page";
import { appUseDispatch, appUseSelector } from '../utils/hooks';

export const EditProfile = () => {

  const dispatch = appUseDispatch();

  const [emailValue, setEmailValue] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { email, name } = appUseSelector(store => store.profilePageStore.userInfo);
  const { success: editSuccess } = appUseSelector(store => store.profilePageStore.editUserInfo);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);

    if (e.target.value === email) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);

    if (e.target.value === name) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    setIsEditing(true);
  };

  const cancelForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setNameValue(name);
    setEmailValue(email);
    setPasswordValue('');
  }

  const submitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();
      dispatch(editUserInfoEnch(nameValue, emailValue, passwordValue));
    }, [nameValue, emailValue, passwordValue]
  )

  useEffect(() => {
    setNameValue(name);
    setEmailValue(email);
  }, [name, email]);

  useEffect(() => {
    setPasswordValue('');
    setIsEditing(false);
  }, [editSuccess]);

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