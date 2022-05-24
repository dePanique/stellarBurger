import React from 'react'
import styles from './burger-ingridients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingridient from '../ingridient/ingridient'

const BurgerIngridients = (props) => {
  const [tab, setTab] = React.useState('Булки')
  const ingridients = props.ingridients

  return(
    <section className={styles.burgerIngridients + ' mr-5'}>
      <h2 className={styles.title + ' text text_type_main-large mt-10 mb-5'}>Соберите бургер</h2>
      <div className={styles.tabRow + ' mb-10'}>
        <Tab value="Булки" active={tab === 'Булки'} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="Соусы" active={tab === 'Соусы'} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={tab === 'Начинки'} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <div className={styles.collection}>

        <p className={styles.ingridientsType + ' text text_type_main-medium'}>Булки</p>
        {ingridients.map((element) => element.type === 'bun' && <Ingridient key={element._id} {...element}/>)}
        <p className={styles.ingridientsType + ' text text_type_main-medium mt-10'}>Соусы</p>
        {ingridients.map((element) => element.type === 'sauce' && <Ingridient key={element._id} {...element}/>)}
        <p className={styles.ingridientsType + ' text text_type_main-medium mt-10'}>Начинки</p>
        {ingridients.map((element) => element.type === 'main' && <Ingridient key={element._id} {...element}/>)}

      </div>
    </section>
  )
}

export default BurgerIngridients