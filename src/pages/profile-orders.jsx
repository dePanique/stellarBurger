import styles from './profile-orders.module.css';
import { useMemo, useState } from 'react';
import { FeedPlate } from '../components/feed-plate/feed-plate';
import { useDispatch, useSelector } from 'react-redux';
import { calcBurgerPriceFeedPage } from '../utils/utils';
import { useEffect } from 'react';
import { closeWebSocket, webSocketStart } from '../services/actions/websocket';
import { WS_URL } from '../utils/constants';
import { getCookie } from '../utils/cookies';

export const ProfileOrders = () => {

  const dispatch = useDispatch();

  const [list, setList] = useState();
  const { orders } = useSelector(store => store.websocket.data);

  const { data: ingredientsData } = useSelector(store => store.appStore)
  const { ingredientsData: ingredientsDetail } = useSelector(store => store.feedPage)

  useEffect(() => {
    dispatch(webSocketStart({
      wsUrl: WS_URL,
      query: `?token=${getCookie('accessToken')?.split(' ')[1]}`
    }));

    return () => dispatch(closeWebSocket());
  }, [])

  const makeList = (orders) => {
    let newList = []
    for (let i = orders.length - 1; i > 0; i--) {

      newList.push(<FeedPlate
        key={orders[i]._id}
        order={orders[i]}
        padding={`mediumPadding`}
        price={calcBurgerPriceFeedPage(orders[i]['ingredients'], ingredientsData)}
        img={orders[i]['ingredients'].map(ingredientID => ingredientsDetail[ingredientID]['image_mobile'])}
      />)
    }

    return newList
  }

  useMemo(() => {
    if (orders) {
      setList([])
      setList(makeList(orders))
      console.log(list);
    }
  }, [orders])

  return (
    <section className={styles.ordersContainer + ` pr-2 ml-15`}>
      {list ? list.map(el => el) : null}
    </section>
  )
}