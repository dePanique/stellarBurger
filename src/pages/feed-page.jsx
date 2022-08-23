import styles from './feed-page.module.css';
import { FeedPlate } from '../components/feed-plate/feed-plate';
import { calcBurgerPriceFeedPage, makeColumnsList } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import {  useEffect, useMemo, useState } from 'react';
import { FEED_URL } from '../utils/constants';
import { closeWebSocket, webSocketStart } from '../services/actions/websocket';

export const FeedPage = () => {

  const { data: ingredientsData } = useSelector(store => store.appStore)
  const { ingredientsData: ingredientsDetail } = useSelector(store => store.feedPage)
  const { total, totalToday, orders } = useSelector(store => store.websocket.data)

  const [doneBurgers, setDoneBurgers] = useState([]);
  const [awaitedBurgers, setAwaitedBurgers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(webSocketStart(FEED_URL));

    return () => dispatch(closeWebSocket());
  }, [])

 useMemo(() => {
    setDoneBurgers([])
    setAwaitedBurgers([])

    if (orders) {
      return orders.map(el => {
        if (el.status === 'done') {
          setDoneBurgers(prevEl => [...prevEl, el.number])
        } else {
          console.log((el.status));
          setAwaitedBurgers(prevEl => [...prevEl, el.number])
        }
      })
    }
  }, [orders])

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
              img={el?.ingredients.map(ingredientID => ingredientsDetail[ingredientID]['image_mobile'])}
            />
          )
          )}

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