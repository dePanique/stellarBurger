import styles from './order-page-profile.module.css';
import { BurgerDetails } from '../components/burger-details/burger-details';
import { FC, useEffect } from 'react';
import { getCookie } from '../utils/cookies';
import { WS_URL } from '../utils/constants';
import { appUseDispatch } from '../utils/hooks';
import { wsCloseWS, wsStart } from '../services/actions/websocket';

export const OrderPageProfile: FC = () => {

  const dispatch = appUseDispatch();

  useEffect(() => {
    dispatch(wsStart(WS_URL + `?token=${getCookie('accessToken')?.split(' ')[1]}`));

    return () => dispatch(wsCloseWS());
  }, [])

  return (
    <main className={styles.main}>
      {<BurgerDetails />}
    </main>
  )
}