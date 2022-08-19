import styles from './feed-order.module.css';
import { BurgerDetails } from '../components/burger-details/burger-details';

export const FeedOrder = () => {

  return (
    <main className={styles.main}>
      <BurgerDetails />
    </main>
  )
}