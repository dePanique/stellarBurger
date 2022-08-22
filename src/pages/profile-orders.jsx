import styles from './profile-orders.module.css';
import { FeedPlate } from '../components/feed-plate/feed-plate';
import { useDispatch, useSelector } from 'react-redux';
import { calcBurgerPriceFeedPage } from '../utils/utils';
import { useEffect } from 'react';
import { closeWebSocket, webSocketStart } from '../services/actions/websocket';
import { WS_URL } from '../utils/constants';
import { getCookie } from '../utils/cookies';

export const ProfileOrders = () => {

  const dispatch = useDispatch();

  const { orders } = useSelector(store => store.websocket.data);

  const { data : ingredientsData } = useSelector(store => store.appStore)
  const { ingredientsData : ingredientsDetail } = useSelector(store => store.feedPage)

  useEffect(() => {
    dispatch(webSocketStart({
      wsUrl: WS_URL,
      query: `?token=${getCookie('accessToken')?.split(' ')[1]}`
    }));

    return () => dispatch(closeWebSocket());
  }, [])

  return (
    <section className={styles.ordersContainer + ` pr-2 ml-15`}>
      {orders && orders.map(el => (
        <FeedPlate
          key={el._id}
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