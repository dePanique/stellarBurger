import { TapePlate } from '../components/tape-plate/tape-plate';
import styles from './profile-orders.module.css';

export const ProfileOrders = () => {
console.log(2);
  return (
    <section className={styles.ordersContainer + ` pr-2 ml-15`}>
      <TapePlate padding={'mediumPadding'}/>
      <TapePlate padding={'mediumPadding'}/>
      <TapePlate padding={'mediumPadding'}/>
      <TapePlate padding={'mediumPadding'}/>
      <TapePlate padding={'mediumPadding'}/>
      <TapePlate padding={'mediumPadding'}/>
      <TapePlate padding={'mediumPadding'}/>
      <TapePlate padding={'mediumPadding'}/>
      <TapePlate padding={'mediumPadding'}/>
      <TapePlate padding={'mediumPadding'}/>
      <TapePlate padding={'mediumPadding'}/>
      <TapePlate padding={'mediumPadding'}/>
    </section>
  )
}