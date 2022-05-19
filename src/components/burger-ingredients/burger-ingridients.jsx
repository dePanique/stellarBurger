import styles from './burger-ingridients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingridient from '../ingridient/ingridient'

const BurgerIngridients = () => {
  return(
    <section className={styles.section + ' pt-10'}>
      <h2 className={styles.title}>Соберите бургер</h2>
      <div className={styles.tabRow}>
        <Tab value="Булки" >
          Булки
        </Tab>
        <Tab value="Соусы" >
          Соусы
        </Tab>
        <Tab value="Начинки" >
          Начинки
        </Tab>
      </div>
      <Ingridient />
    </section>
  )
}

export default BurgerIngridients