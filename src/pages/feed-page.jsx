import styles from './feed-page.module.css';
import { TapePlate } from '../components/tape-plate/tape-plate';

export const FeedPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.tapeColumn}>
        <h1 className={styles.tapeTitle + ` text text_type_main-large`}>
          Лента заказов
        </h1>
        <div className={styles.tapeContainer + ` pr-2`}>
          <TapePlate />
        </div>
      </section>
      <section className={styles.ordersAnalysis + ` ml-15`}>
        <ul className={styles.summaryTable}>
          <li className={styles.ordersProcessing}></li>
          <li className={styles.ordersOverall}></li>
          <li className={styles.todayOrders}></li>
        </ul>
      </section>
    </main>
  )
}