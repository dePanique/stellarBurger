import styles from "./reset-password.module.css";
import React, { useState, useCallback, useEffect, FC } from "react";
import { Link, useHistory } from 'react-router-dom';
import Main from "../components/main/main";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { applyNewPassEnch } from "../services/actions/reset-password";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

export const ResetPassword: FC = () => {

  const [newPassValue, setNewPassValue] = useState<string>('');
  const [confirmPassValue, setConfirmPassValue] = useState<string>('');
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { success: isPassReseted, failed: isPassFailed }: {
    success: boolean; failed: boolean;
  } = useAppSelector(store => store.resetPassStore);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(applyNewPassEnch(newPassValue, confirmPassValue));
    }, [history, newPassValue, confirmPassValue]
  );

  const onNewPassValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassValue(e.target.value);
  };

  const onConfirmPassValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassValue(e.target.value);
  };

  useEffect(() => {
    if (isPassReseted) history.replace({ pathname: '/login' });
    if (isPassFailed) setConfirmPassValue('Повторите попытку');
  }, [isPassReseted])

  return (
    <Main>
      <div className={styles.column}>
        <h1 className={styles.title + ` mb-6 text text_type_main-medium`}>Восстановление пароля</h1>

        <form className={styles.form + ` mb-20`} action="submit" onSubmit={onSubmit}>
          <fieldset className={styles.inputColumn}>
            <PasswordInput
              onChange={onNewPassValueChange}
              value={newPassValue}
              name={'newPass'}
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
  );
}