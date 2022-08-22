import styles from './order-page.module.css';
import { BurgerDetails } from '../components/burger-details/burger-details';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeWebSocket, webSocketStart } from '../services/actions/websocket';
import { FEED_URL } from '../utils/constants';

export const OrderPage = () => {

  const dispatch = useDispatch();

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