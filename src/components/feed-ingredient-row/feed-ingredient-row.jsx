import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './feed-ingredient-row.module.css'

export const FeedIngredientRow = () => {

  return (
    <li className={styles.ingredientRow + ` mb-4 mr-6`}>
      <div className={styles.iconContainer + ``}>
        <div className={styles.iconCover}>
          <img
            className={styles.ingredientImage}
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            alt=""
          />
        </div>
      </div>

      <p className={
        styles.ingredientName + ` text text_type_main-default ml-4 mr-4`
      }>
        Филе Люминесцентного тетраодонтимформа
      </p>

      <div className={styles.priceRow}>
        <p className={styles.priceCalculating + ` text text_type_digits-default`}>
          2 x 20
        </p>

        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}