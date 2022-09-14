import styles from './feed-plate.module.css';
import { FC } from 'react';
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IFeedPlate } from '../../utils/type';

const burgerStatusObj: {[name: string]: string} = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
}

export const FeedPlate: FC<IFeedPlate> = ({ padding, order, price, img }) => {

  const [burgerStatus, setBurgerStatus] = useState<string>();
  const location = useLocation();
  const route = location?.pathname.split('/')[1] === 'profile' ?
    `/profile/orders/${order?._id}` : `/feed/${order?._id}`;
  const isProfile = location?.pathname.split('/')[1];

  useEffect(() => {
    setBurgerStatus(burgerStatusObj[`${order.status}`]);
  }, [order.status]);

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
              {`#${order.number}`}
            </h2>

            <p className={
              styles.time +
              ` text text_type_main-default text_color_inactive`
            }>
              {`${new Date(order.createdAt).toLocaleString(
                'ru', {
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} i-GMT+3`
              }
            </p>
          </div>

          <p className={
            styles.burgerName +
            ` text text_type_main-medium mt-6`
          }>
            {order.name}
          </p>

          {isProfile === 'profile' && (order?.status === 'done' ? (
            <p className={
              styles.burgerStatus +
              ` text text_type_main-default mt-2 ` +
              styles.burgerStatusSuccess
            }>
              {burgerStatus}
            </p>
          ) : (
            <p className={
              styles.burgerStatus +
              ` text text_type_main-default mt-2 `
            }>
              {burgerStatus}
            </p>
          ))}

        </div>
        <div className={styles.detailPlate + ` mt-6 mb-6`}>
          <ul className={styles.ingredientsRow}>

            {img.map((element, index) => (
              img.length < 7 ? (
                <li
                  className={styles.ingredientIcon + ` ` + styles[`left_${index + 1}`]}
                  key={Math.random().toString(36).slice(2)}
                >
                  <div className={styles.iconFrame}>
                    <img
                      src={element}
                      alt=""
                      className={styles.ingredientImage}
                    />
                  </div>
                </li>
              ) : (
                index < 5 ? (
                  <li
                    className={styles.ingredientIcon + ` ` + styles[`left_${index + 1}`]}
                    key={Math.random().toString(36).slice(2)}
                  >
                    <div className={styles.iconFrame}>
                      <img
                        src={element}
                        alt=""
                        className={styles.ingredientImage}
                      />
                    </div>
                  </li>
                ) : (
                  index === 5 ?
                    (
                      <li
                        className={styles.ingredientIcon + ` ` + styles.left_6}
                        key={Math.random().toString(36).slice(2)}
                      >
                        <p className={styles.ingredientsAmount + ` text text_type_digits-default`}>
                          {`+${img.length - 6}`}
                        </p>
                        <div className={styles.iconFrame + ` ` + styles.iconFade}>
                          <img
                            src={element}
                            alt=""
                            className={styles.ingredientImage}
                          />
                        </div>
                      </li>
                    ) : (
                      null
                    )
                )
              )

            )
            )}
          </ul>

          <article className={styles.priceIcon + ` ml-6`}>
            <p className={styles.orderPrice + `  text text_type_digits-default`}>
              {price}
            </p>
            <CurrencyIcon type="primary" />
          </article>
        </div>
      </article>
    </Link>
  )
}