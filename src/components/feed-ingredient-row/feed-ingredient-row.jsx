import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './feed-ingredient-row.module.css'

export const FeedIngredientRow = ({img, name, price, quan}) => {

  return (
    <li className={styles.ingredientRow + ` mb-4 mr-6`}>
      <div className={styles.iconContainer + ``}>
        <div className={styles.iconCover}>
          <img
            className={styles.ingredientImage}
            src={img}
            alt=""
          />
        </div>
      </div>

      <p className={
        styles.ingredientName + ` text text_type_main-default ml-4 mr-4`
      }>
        {name}
      </p>

      <div className={styles.priceRow}>
        <p className={styles.priceCalculating + ` text text_type_digits-default`}>
          {`${quan} x ${price}`}
        </p>

        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}