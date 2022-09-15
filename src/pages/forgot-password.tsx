import { useState, useCallback, useEffect, FC } from "react";
import { useHistory, Link } from "react-router-dom";
import Main from "../components/main/main";
import styles from "./forgot-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { requestEmailPassResetEnch } from "../services/actions/forgot-password";
import { RESET_PASS_INITIAL } from "../services/actions/reset-password";
import { appUseDispatch, appUseSelector } from "../utils/hooks";

export const ForgotPassword: FC = () => {

  const [emailValue, setEmailValue] = useState<string>('');
  const [inputPlaceholder, setInputPlaceholder] = useState<string>('Укажите e-mail');

  const history = useHistory();
  const dispatch = appUseDispatch();

  const { success: isPassReseted }: { success: boolean } = appUseSelector(store => store.forgotPasswordStore)

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(requestEmailPassResetEnch(emailValue));

    }, [emailValue]
  )

  useEffect(() => {
    if (isPassReseted) history.replace({ pathname: '/reset-password' })
  }, [isPassReseted])

  const onEmailInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  useEffect(() => {
    dispatch({
      type: RESET_PASS_INITIAL,
    })
  }, [])

  return (
    <Main>
      <div className={styles.column}>
        <h1 className={styles.title + ` mb-6 text text_type_main-medium`}>Восстановление пароля</h1>

        <form className={styles.form + ` mb-20`} action="submit" onSubmit={onSubmit}>

          <div className={styles.input}>
            <Input
              onChange={onEmailInputValueChange}
              value={emailValue}
              name={'email'}
              placeholder={inputPlaceholder}
            />
          </div>

          <div className={styles.button}>
            <Button
              type='primary'
              size='medium'
            >
              Восстановить
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