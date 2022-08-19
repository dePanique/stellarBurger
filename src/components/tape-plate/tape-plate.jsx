import styles from './tape-plate.module.css';
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useParams } from 'react-router-dom';

export const TapePlate = ({padding}) => {
  const params = useParams()

  const location = useLocation()

const route = location?.pathname.split('/')[1] === 'profile' ? '/profile/orders/id' : '/feed/id'
console.log(route);
  return (
    <Link
    className={styles.link}
    to={{
      pathname: `${route}`,
      state: { background: location }
    }}>
      <article className={styles.box + ` ` + styles[`${padding}`]}>
        <div className={styles.column}>
          <div className={styles.title + ` mt-6`}>
            <h2 className={
              styles.orderNumber +
              ` text text_type_digits-default`
            }>
              #034534
            </h2>

            <p className={
              styles.time +
              ` text text_type_main-default text_color_inactive`
            }>
              Сегодня, 16:20 i-GMT+3
            </p>
          </div>

          <p className={
            styles.burgerName +
            ` text text_type_main-medium mt-6`
          }>
            Inters Star Starship Main бургер
          </p>

          <p className={
            styles.burgerStatus +
            ` text text_type_main-default mt-2 `
          }>
            Создан
          </p>

        </div>
          <div className={styles.detailPlate + ` mt-6 mb-6`}>
            <ul className={styles.ingredientsRow}>

            <li className={styles.ingredientIcon + ` ` + styles[`left_${1}`]}>
                <div className={styles.iconFrame}>
                  <img
                        src="https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                        alt=""
                        className={styles.ingredientImage}
                  />
                </div>
              </li>

              <li className={styles.ingredientIcon + ` ` + styles[`left_${2}`]}>
                <div className={styles.iconFrame}>
                  <img
                        src="https://code.s3.yandex.net/react/code/meat-03-mobile.png"
                        alt=""
                        className={styles.ingredientImage}
                  />
                </div>
              </li>

              <li className={styles.ingredientIcon + ` ` + styles[`left_${3}`]}>
                <div className={styles.iconFrame}>
                  <img
                        src="https://code.s3.yandex.net/react/code/core-mobile.png"
                        alt=""
                        className={styles.ingredientImage}
                  />
                </div>
              </li>

              <li className={styles.ingredientIcon + ` ` + styles[`left_${4}`]}>
                <div className={styles.iconFrame}>
                  <img
                        src="https://code.s3.yandex.net/react/code/mineral_rings-mobile.png"
                        alt=""
                        className={styles.ingredientImage}
                  />
                </div>
              </li>

              <li className={styles.ingredientIcon + ` ` + styles[`left_${5}`]}>
                <div className={styles.iconFrame}>
                  <img
                        src="https://code.s3.yandex.net/react/code/sauce-03-mobile.png"
                        alt=""
                        className={styles.ingredientImage}
                  />
                </div>
              </li>

              <li className={styles.ingredientIcon + ` ` + styles[`left_${6}`]}>
                  <p className={styles.ingredientsAmount + ` text text_type_digits-default`}>+3</p>
                <div className={styles.iconFrame + ` ` + styles.iconFade}>
                  <img
                        src="https://code.s3.yandex.net/react/code/cheese-mobile.png"
                        alt=""
                        className={styles.ingredientImage}
                  />
                </div>
              </li>
            </ul>

            <article className={styles.priceIcon + ` ml-6`}>
              <p className={styles.orderPrice + `  text text_type_digits-default`}>3596</p>
              <CurrencyIcon type="primary" />
            </article>
          </div>
      </article>
    </Link>
  )
}