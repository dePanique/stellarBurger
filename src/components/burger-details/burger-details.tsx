import styles from './burger-details.module.css';
import { ReactNode } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FeedIngredientRow } from '../feed-ingredient-row/feed-ingredient-row';
import { calcBurgerPriceFeedPage } from '../../utils/utils';
import { appUseSelector } from '../../utils/hooks';
import { TBurgerDetails, TIngredient, TIngredientsData } from '../../utils/type';

const burgerStatusObj: { [name: string]: string } = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
};

export const BurgerDetails = () => {

  const { data: ingredientsData }: {
    data: TIngredient[];
  } = appUseSelector(store => store.appStore);
  const { ingredientsData: ingredientsDetail }: {
    ingredientsData: TIngredientsData;
  } = appUseSelector(store => store.feedPage);

  const { id }: { id: string } = useParams();

  const location = useLocation();
  const pageName = location.pathname.split('/')[1]

  const page: { [name: string]: Array<TBurgerDetails> } = {
    feed: [],
    profile: [],
  };

  page.feed = appUseSelector(store => store.websocket?.data?.orders)?.filter((el: { _id: string }) => el._id === id);
  page.profile = appUseSelector(store => store.websocket?.data?.orders)?.filter((el: { _id: string }) => el._id === id);

  let order: TBurgerDetails = pageName === 'profile' ? page?.profile?.[0] : page?.feed?.[0];

  const ingredients: { [name: string]: ReactNode } = {};

  order?.ingredients.forEach((el, _, arr) => {
    ingredients[`${el}`] =
      <FeedIngredientRow
        key={el}
        img={ingredientsDetail[el]['image_mobile']}
        name={ingredientsDetail[el]['name']}
        price={ingredientsDetail[el]['price']}
        quan={arr.filter(element => element === el).length}
      />
  });

  const ingredientsList: Array<ReactNode> = [];

  for (let key in ingredients) ingredientsList.push(ingredients[`${key}`]);

  return (
    order &&
    <section className={styles.container}>
      <h1 className={styles.title + ` text text_type_digits-default mb-10`}>
        {`#${order.number}`}
      </h1>

      <h2 className={styles.burgerName + ` text text_type_main-medium mb-3`}>
        {order.name}
      </h2>

      <p className={styles.burgerStatusSuccess + ` text text_type_main-default mb-15`}>
        {burgerStatusObj[`${order.status}`]}
      </p>

      <p className={styles.ingredientsHead + ` text text_type_main-medium mb-6`}>
        Состав:
      </p>

      <ul className={styles.ingredientsColumns}>
        {ingredientsList.map(el => el)
        }
      </ul>

      <div className={styles.timeAndFullPrice + ` mt-10`}>
        <p className={styles.time + ` text text_type_main-default`}>
          {`${new Date(order.createdAt).toLocaleString(
            'ru', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })} i-GMT+3`
          }
        </p>

        <div className={styles.priceRow}>
          <p className={styles.fullPrice + ` text text_type_digits-default`}>
            {calcBurgerPriceFeedPage(order.ingredients, ingredientsData)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </section>
  )
}