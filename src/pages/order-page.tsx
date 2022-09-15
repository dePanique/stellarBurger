import styles from './order-page.module.css';
import { BurgerDetails } from '../components/burger-details/burger-details';
import { FC, useEffect } from 'react';
import { closeWebSocket, webSocketStart } from '../services/actions/websocket';
import { FEED_URL } from '../utils/constants';
import { appUseDispatch } from '../utils/hooks';

export const OrderPage: FC = () => {

  const dispatch = appUseDispatch();

  useEffect(() => {
    dispatch(webSocketStart(FEED_URL));

    return () => dispatch(closeWebSocket());
  }, [])

  return (
    <main className={styles.main}>
      {<BurgerDetails />}
    </main>
  )
}