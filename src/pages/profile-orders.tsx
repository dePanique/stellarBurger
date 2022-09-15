import styles from './profile-orders.module.css';
import { FC, useMemo, useState, ReactNode } from 'react';
import { FeedPlate } from '../components/feed-plate/feed-plate';
import { calcBurgerPriceFeedPage } from '../utils/utils';
import { useEffect } from 'react';
import { closeWebSocket, webSocketStart } from '../services/actions/websocket';
import { WS_URL } from '../utils/constants';
import { getCookie } from '../utils/cookies';
import { appUseDispatch, appUseSelector } from '../utils/hooks';
import { IWSDataOrders, TIngredient, TIngredientsData } from '../utils/type'

export const ProfileOrders: FC = () => {

  const dispatch = appUseDispatch();

  const [list, setList] = useState<ReactNode[]>();

  const { orders }: {
    orders: IWSDataOrders[];
  } = appUseSelector(store => store.websocket.data);

  const { data: ingredientsData }: {
    data: TIngredient[];
  } = appUseSelector(store => store.appStore);

  const { ingredientsData: ingredientsDetail }: {
    ingredientsData: TIngredientsData;
  } = appUseSelector(store => store.feedPage);

  useEffect(() => {
    dispatch(webSocketStart({
      wsUrl: WS_URL,
      query: `?token=${getCookie('accessToken')?.split(' ')[1]}`
    }));

    return () => dispatch(closeWebSocket());
  }, []);

  const makeList = (orders: IWSDataOrders[]): ReactNode[] => {
    let newList: ReactNode[] = [];

    for (let i = orders.length - 1; i > 0; i--) {

      newList.push(
        <FeedPlate
          key={orders[i]._id}
          order={orders[i]}
          padding={`mediumPadding`}
          price={calcBurgerPriceFeedPage(orders[i]['ingredients'], ingredientsData)}
          img={orders[i]['ingredients'].map((ingredientID: string) => ingredientsDetail[ingredientID]['image_mobile'])}
        />
      );
    };

    return newList
  };

  useMemo(() => {
    if (orders) {
      setList([]);
      setList(makeList(orders));
    }
  }, [orders]);

  return (
    <section className={styles.ordersContainer + ` pr-2 ml-15`}>
      {list ? list.map(el => el) : null}
    </section>
  );
}