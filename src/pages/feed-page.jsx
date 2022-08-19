import styles from './feed-page.module.css';
import { TapePlate } from '../components/tape-plate/tape-plate';
import { makeColumnsList } from '../utils/utils';

export const FeedPage = () => {
  const numbersO = [
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,
    123234,



  ]

  return (
    <main className={styles.main}>
      <section className={styles.tapeColumn}>
        <h1 className={styles.tapeTitle + ` text text_type_main-large`}>
          Лента заказов
        </h1>
        <div className={styles.tapeContainer + ` pr-2`}>
          <TapePlate padding={`smallPadding`}/>
          <TapePlate padding={`smallPadding`}/>
          <TapePlate padding={`smallPadding`}/>
          <TapePlate padding={`smallPadding`}/>
          <TapePlate padding={`smallPadding`}/>
          <TapePlate padding={`smallPadding`}/>
          <TapePlate padding={`smallPadding`}/>
          <TapePlate padding={`smallPadding`}/>
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
              {makeColumnsList(numbersO, styles.completedColumnItem)}

            </ul>
          </article>

          <article className={styles.ordersInWorkColumn}>
            <h3 className={styles.ordersInWorkTitle + ` text text_type_main-medium mb-6`}>
              В работе:
            </h3>

            <ul className={styles.ordersInWorkList}>
              {makeColumnsList(numbersO, styles.ordersInWorkItem)}
            </ul>
          </article>
        </article>

        <article className={` mt-15`}>
          <h3 className={` text text_type_main-medium`}>
            Выполнено за все время:
          </h3>

          <p className={styles.ordersOverallAmount + ` text text_type_digits-large`}>
            28 752
          </p>
        </article>

        <article className={` mt-15`}>
          <h3 className={` text text_type_main-medium`}>
            Выполнено за сегодня:
          </h3>

          <p className={styles.todayOrdersAmount + ` text text_type_digits-large`}>
            138
          </p>
        </article>
      </section>
    </main>
  )
}