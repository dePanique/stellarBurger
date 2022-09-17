import styles from './feed-page.module.css';
import { FeedPlate } from '../components/feed-plate/feed-plate';
import { calcBurgerPriceFeedPage, makeColumnsList } from '../utils/utils';
import { FC, useEffect, useMemo, useState } from 'react';
import { FEED_URL, WS_QUERY, WS_URL } from '../utils/constants';
import { appUseDispatch, appUseSelector } from '../utils/hooks';
import { IWSDataOrders, TIngredient, TIngredientsData } from '../utils/type';
import { wsCloseWS, wsStart } from '../services/actions/websocket';

export const FeedPage: FC = () => {

  const { data: ingredientsData }: {
    data: TIngredient[];
  } = appUseSelector(store => store.appStore);

  const { ingredientsData: ingredientsDetail }: {
    ingredientsData: TIngredientsData;
  } = appUseSelector(store => store.feedPage);

  const { total, totalToday, orders }: {
    total: number;
    totalToday: number;
    orders: IWSDataOrders[];
  } = appUseSelector(store => store.websocket.data);

  const [doneBurgers, setDoneBurgers] = useState<number[]>([]);
  const [awaitedBurgers, setAwaitedBurgers] = useState<number[]>([]);

  const dispatch = appUseDispatch();

  useEffect(() => {
    dispatch(wsStart(WS_URL + WS_QUERY));

    return () => dispatch(wsCloseWS());
  }, []);

  useMemo(() => {
    setDoneBurgers([]);
    setAwaitedBurgers([]);

    if (orders) {
      return orders.forEach(el => {
        if (el.status === 'done') {
          setDoneBurgers((prevEl: number[]) => [...prevEl, el.number]);
        } else {
          setAwaitedBurgers((prevEl: number[]) => [...prevEl, el.number]);
        }
      });
    }

  }, [orders]);

  return (
    <main className={styles.main}>
      <section className={styles.feedColumn}>
        <h1 className={styles.feedTitle + ` text text_type_main-large`}>
          Лента заказов
        </h1>
        <div className={styles.feedContainer + ` pr-2`}>
          {orders && orders.map(el => (
            <FeedPlate
              key={el._id}
              order={el}
              padding={`smallPadding`}
              price={calcBurgerPriceFeedPage(el.ingredients, ingredientsData)}
              img={el?.ingredients.map((ingredientID: string) => ingredientsDetail[ingredientID]['image_mobile'])}
            />
          ))}
        </div>
      </section>

      <section className={styles.ordersAnalysis + ` ml-15`}>
        <article className={styles.ordersProcessing}>
          <article className={styles.completedOrdersColumn + ` mr-9`}>
            <h3 className={
              styles.completedOrdersTitle + ` text text_type_main-medium mb-6`
            }>
              Готовы:
            </h3>

            <ul className={styles.completedOrdersList}>
              {makeColumnsList(doneBurgers, styles.completedColumnItem)}
            </ul>
          </article>

          <article className={styles.ordersInWorkColumn}>
            <h3 className={styles.ordersInWorkTitle + ` text text_type_main-medium mb-6`}>
              В работе:
            </h3>

            <ul className={styles.ordersInWorkList}>
              {makeColumnsList(awaitedBurgers, styles.ordersInWorkItem)}
            </ul>
          </article>
        </article>

        <article className={` mt-15`}>
          <h3 className={` text text_type_main-medium`}>
            Выполнено за все время:
          </h3>

          <p className={styles.ordersOverallAmount + ` text text_type_digits-large`}>
            {total}
          </p>
        </article>

        <article className={` mt-15`}>
          <h3 className={` text text_type_main-medium`}>
            Выполнено за сегодня:
          </h3>

          <p className={styles.todayOrdersAmount + ` text text_type_digits-large`}>
            {totalToday}
          </p>
        </article>
      </section>
    </main>
  )
}