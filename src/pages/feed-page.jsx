import styles from './feed-page.module.css';
import { TapePlate } from '../components/tape-plate/tape-plate';
import { makeColumnsList } from '../utils/utils';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const FeedPage = () => {
  const { total, totalToday, orders } = useSelector(store => store.feedPage)
  const [doneBurgers, setDoneBurgers] = useState([]);
  const [awaitedBurgers, setAwaitedBurgers] = useState([])

  useMemo(() => {
    setDoneBurgers([])
    orders.map( el => {
      if (el.status === 'done') {
        setDoneBurgers(prevEl => [...prevEl, el.number])
      } else {
        setAwaitedBurgers(prevEl => [ ...prevEl, el.number])
      }
    })
  }, [orders])


  return (
    <main className={styles.main}>
      <section className={styles.tapeColumn}>
        <h1 className={styles.tapeTitle + ` text text_type_main-large`}>
          Лента заказов
        </h1>
        <div className={styles.tapeContainer + ` pr-2`}>
          {orders.map(el => (
            <TapePlate
              key={Math.random().toString(36).slice(2)}
              order={el}
              padding={`smallPadding`}
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