import PropTypes from 'prop-types'
import styles from './burger-constructor.module.css'
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import  { dataTemplate }  from '../../utils/utils'

const BurgerConstructor = ({data, func}) => {
  const bunImage = data.map((element) => element.name === "Краторная булка N-200i" && element )[0]


  return (
    <section className={styles.burgerConstructor + ' ml-5 pl-4 pt-25'}>

      <div className="topElement ml-8 mb-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={bunImage.price}
          thumbnail={bunImage.image}
          />
      </div>

      <ul className={styles.components}>
        {data.filter((element) => element.type !== 'bun').map(element =>
          <li key={element._id} className={styles.ingridient + ' mb-4'}>
            <DragIcon type='primary'/>
            <ConstructorElement
            text={element.name}
            price={element.price}
            thumbnail={element.image}
            />
          </li>
          )}
      </ul>

      <div className=' ml-8 mt-4'>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={bunImage.price}
          thumbnail={bunImage.image}
        />
      </div>

      <div className={styles.scoreRow + ' mt-10 mr-4'}>
        <p className={styles.finalScore + ' text text_type_digits-medium'}>610</p>
        <div className={styles.currencyBig + ' mr-10'}></div>
        <Button type="primary" size="large" onClick={() => { func()}}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataTemplate.isRequired).isRequired
}

export default BurgerConstructor