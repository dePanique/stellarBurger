import styles from './profile-orders.module.css';
import { FC, useMemo, useState, ReactNode } from 'react';
import { FeedPlate } from '../components/feed-plate/feed-plate';
import { calcBurgerPriceFeedPage } from '../utils/utils';
import { useEffect } from 'react';
import { WS_URL } from '../utils/constants';
import { getCookie } from '../utils/cookies';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { IWSDataOrders, TIngredient, TIngredientsData } from '../utils/type'
import { wsCloseWS, wsStart } from '../services/actions/websocket';

export const ProfileOrders: FC = () => {

  const dispatch = useAppDispatch();

  const [list, setList] = useState<ReactNode[]>();

  const { orders }: {
    orders: IWSDataOrders[];
  } = useAppSelector(store => store.websocket.data);

  const { data: ingredientsData }: {
    data: TIngredient[];
  } = useAppSelector(store => store.appStore);

  const { ingredientsData: ingredientsDetail }: {
    ingredientsData: TIngredientsData;
  } = useAppSelector(store => store.feedPage);

  useEffect(() => {
    dispatch(wsStart(WS_URL + `?token=${getCookie('accessToken')?.split(' ')[1]}`));

    return () => dispatch(wsCloseWS());
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