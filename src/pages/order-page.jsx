import styles from './order-page.module.css';
import { BurgerDetails } from '../components/burger-details/burger-details';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wsEnch } from '../services/actions/websocket';
import { WS_URL } from '../utils/constants';

export const OrderPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsEnch({
      wsUrl: WS_URL,
      query: '/all'
    }, 'start'))

    return () => {
      dispatch(wsEnch({
      }, 'close'))
    }
  }, [])

  return (
    <main className={styles.main}>
      {<BurgerDetails />}
    </main>
  )
}