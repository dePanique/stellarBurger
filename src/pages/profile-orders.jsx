import { TapePlate } from '../components/tape-plate/tape-plate';
import styles from './profile-orders.module.css';
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const ProfileOrders = () => {
  const history = useHistory()

  const { orders } = useSelector(store => store.feedPage)


  return (
    <section className={styles.ordersContainer + ` pr-2 ml-15`}>
      {orders.map(el => (
        <TapePlate
          key={Math.random().toString(36).slice(2)}
          order={el}
          padding={`mediumPadding`}
        />
      )
      )}
    </section>
  )
}