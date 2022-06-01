import PropTypes from 'prop-types'
import styles from './ingridient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Ingridient = (props) => {

  return (
    <div className={styles.box + ' ml-4 mr-2 mt-6'} onClick={() => props.handle(true)}>
      <Counter count={1} size='default'/>
      <img className='pl-4 pr-4 mb-1' src={props.image} alt="#" />
      <p className="text text_type_digits-default mr-2">{props.price}</p>
      <CurrencyIcon type='primary'/>
      <p className={styles.itemName + " text text_type_main-default mt-1"}>{props.name}</p>
    </div>
  )
}

Ingridient.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default Ingridient