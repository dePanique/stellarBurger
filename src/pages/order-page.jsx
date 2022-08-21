import styles from './order-page.module.css';
import { BurgerDetails } from '../components/burger-details/burger-details';

export const OrderPage = () => {

  return (
    <main className={styles.main}>
      {<BurgerDetails />}
    </main>
  )
}