import React from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingridients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingridient from '../ingridient/ingridient'
import  { dataTemplate }  from '../../utils/utils'

const BurgerIngridients = ({ data }) => {
  const [tab, setTab] = React.useState('Булки')

  return(
    <section className={styles.burgerIngridients + ' mr-5'}>
      <h2 className={styles.title + ' text text_type_main-large mt-10 mb-5'}>Соберите бургер</h2>

      <div className={styles.tabRow + ' mb-10'}>
        <a href='#bun' className={styles.link + ' text text_type_main-default'}>
          <Tab value="Булки" active={tab === 'Булки'} onClick={setTab}>
            Булки
          </Tab>
        </a>
        <a href="#sauces" className={styles.link + ' text text_type_main-default'}>
          <Tab value="Соусы" active={tab === 'Соусы'} onClick={setTab}>
            Соусы
          </Tab>
        </a>
        <a href='#main' className={styles.link + ' text text_type_main-default'}>
          <Tab value="Начинки" active={tab === 'Начинки'} onClick={setTab}>
            Начинки
          </Tab>
        </a>
      </div>

      <div className={styles.collection}>
        <p id='bun' className={styles.ingridientsType + ' text text_type_main-medium'}>Булки</p>
        {data.map((element) => element.type === 'bun' && <Ingridient key={element._id} {...element}/>)}
        <p id='sauces' className={styles.ingridientsType + ' text text_type_main-medium mt-10'}>Соусы</p>
        {data.map((element) => element.type === 'sauce' && <Ingridient key={element._id} {...element}/>)}
        <p id='main' className={styles.ingridientsType + ' text text_type_main-medium mt-10'}>Начинки</p>
        {data.map((element) => element.type === 'main' && <Ingridient key={element._id} {...element}/>)}
      </div>
    </section>
  )
}

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(dataTemplate.isRequired)
}

export default BurgerIngridients