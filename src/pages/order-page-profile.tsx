import styles from './order-page-profile.module.css';
import { BurgerDetails } from '../components/burger-details/burger-details';
import { FC, useEffect } from 'react';
import { closeWebSocket, webSocketStart } from '../services/actions/websocket';
import { getCookie } from '../utils/cookies';
import { WS_URL } from '../utils/constants';
import { appUseDispatch } from '../utils/hooks';

export const OrderPageProfile: FC = () => {

  const dispatch = appUseDispatch();

  useEffect(() => {
    dispatch(webSocketStart({
      wsUrl: WS_URL,
      query: `?token=${getCookie('accessToken')?.split(' ')[1]}`
    }));

    return () => dispatch(closeWebSocket());
  }, [])

  return (
    <main className={styles.main}>
      {<BurgerDetails />}
    </main>
  )
}