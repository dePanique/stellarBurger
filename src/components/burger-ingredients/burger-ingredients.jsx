import { useState, } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingredients.module.css'
import Ingredient from '../ingredient/ingredient'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import  { dataTemplate }  from '../../utils/utils'

const BurgerIngredients = ({data}) => {
  const [tab, setTab] = useState('Булки')
  const [modal, setModal] = useState(false)
  const [ingredient, setIngredient] = useState({})

  return(
    <section className={styles.burgerIngredients + ' mr-5'} >
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
        <p id='bun' className={styles.ingredientsType + ' text text_type_main-medium'}>Булки</p>
        {data.map((element) => element.type === 'bun' &&
          <Ingredient
            key={element._id}
            element={element}
            setIngredient={setIngredient}
            handle={setModal}
          />
        )}

        <p id='sauces' className={styles.ingredientsType + ' text text_type_main-medium mt-10'}>Соусы</p>
        {data.map((element) => element.type === 'sauce' &&
          <Ingredient
            key={element._id}
            element={element}
            setIngredient={setIngredient}
            handle={setModal}
          />
        )}

        <p id='main' className={styles.ingredientsType + ' text text_type_main-medium mt-10'}>Начинки</p>
        {data.map((element) => element.type === 'main' &&
          <Ingredient
            key={element._id}
            element={element}
            setIngredient={setIngredient}
            handle={setModal}
          />
        )}
      </div>

      {modal &&
      <Modal handle={setModal}>
        <IngredientDetails data={ingredient}/>
      </Modal>}
    </section>
  )
}

// BurgerIngredients.propTypes = {
//   data: PropTypes.arrayOf(dataTemplate.isRequired).isRequired,
//   handleIngredientsDetails: PropTypes.func.isRequired
// }

export default BurgerIngredients