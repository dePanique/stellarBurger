import styles from './order-page.module.css';
import { BurgerDetails } from '../components/burger-details/burger-details';
import { useParams } from'react-router-dom';

export const OrderPage = () => {

  const { id } = useParams();

  console.log(id);

  return (
    <main className={styles.main}>
      <BurgerDetails />
    </main>
  )
}