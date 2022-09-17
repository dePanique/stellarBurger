import styles from './order-page.module.css';
import { BurgerDetails } from '../components/burger-details/burger-details';
import { FC, useEffect } from 'react';
import { wsCloseWS, wsStart } from '../services/actions/websocket';
import {  WS_QUERY, WS_URL } from '../utils/constants';
import { appUseDispatch } from '../utils/hooks';

export const OrderPage: FC = () => {

  const dispatch = appUseDispatch();

  useEffect(() => {
    dispatch(wsStart(WS_URL + WS_QUERY));

    return () => dispatch(wsCloseWS());
  }, [])

  return (
    <main className={styles.main}>
      {<BurgerDetails />}
    </main>
  )
}