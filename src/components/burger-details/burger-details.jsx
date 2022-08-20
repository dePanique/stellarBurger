import styles from './burger-details.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FeedIngredientRow } from '../feed-ingredient-row/feed-ingredient-row';

export const BurgerDetails = () => {
  
  return (
    <section className={styles.container}>
      <h1 className={styles.title + ` text text_type_digits-default mb-10`}>
        #034533
      </h1>

      <h2 className={styles.burgerName + ` text text_type_main-medium mb-3`}>
        Black Hole Singularity острый бургер
      </h2>

      <p className={styles.burgerStatusSuccess + ` text text_type_main-default mb-15`}>
        Выполнен
      </p>

      <p className={styles.ingredientsHead + ` text text_type_main-medium mb-6`}>
        Состав:
      </p>

      <ul className={styles.ingredientsColumns}>
        <FeedIngredientRow />
        <FeedIngredientRow />
        <FeedIngredientRow />
        <FeedIngredientRow />
        <FeedIngredientRow />
        <FeedIngredientRow />
        <FeedIngredientRow />
        <FeedIngredientRow />
      </ul>

      <div className={styles.timeAndFullPrice + ` mt-10`}>
        <p className={styles.time + ` text text_type_main-default`}>
          Вчера, 13:50 i-GMT+3
        </p>

        <div className={styles.priceRow}>
          <p className={styles.fullPrice + ` text text_type_digits-default`}>
            510
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  )
}