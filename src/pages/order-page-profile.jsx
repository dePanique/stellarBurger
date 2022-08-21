import styles from './order-page-profile.module.css';
import { BurgerDetails } from '../components/burger-details/burger-details';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserInfoEnch } from '../services/actions/profile-page';

export const OrderPageProfile = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfoEnch())
  }, []);

  return (
    <main className={styles.main}>
      {<BurgerDetails />}
    </main>
  )
}