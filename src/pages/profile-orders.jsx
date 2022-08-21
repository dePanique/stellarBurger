import { TapePlate } from '../components/tape-plate/tape-plate';
import styles from './profile-orders.module.css';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { calcBurgerPriceFeedPage } from '../utils/utils';
import { useMemo } from 'react';

export const ProfileOrders = () => {
  const history = useHistory()

  const { orders } = useSelector(store => store.profileOrders.data)

  const { data : ingredientsData } = useSelector(store => store.appStore)
  const { ingredientsData : ingredientsDetail } = useSelector(store => store.feedPage)

  return (
    <section className={styles.ordersContainer + ` pr-2 ml-15`}>
      {orders && orders.map(el => (
        <TapePlate
          key={Math.random().toString(36).slice(2)}
          order={el}
          padding={`mediumPadding`}
          price={calcBurgerPriceFeedPage(el.ingredients, ingredientsData)}
          img={el.ingredients.map(ingredientID => ingredientsDetail[ingredientID]['image_mobile'])}
        />
        ))
      }
    </section>
  )
}