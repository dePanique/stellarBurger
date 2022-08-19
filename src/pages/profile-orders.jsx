import { TapePlate } from '../components/tape-plate/tape-plate';
import styles from './profile-orders.module.css';
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';

export const ProfileOrders = () => {
  const history = useHistory()

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