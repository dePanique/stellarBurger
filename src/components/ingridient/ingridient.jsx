import styles from './ingridient.module.css'
import { Counter, CurrencyIcon, Icon } from '@ya.praktikum/react-developer-burger-ui-components'

const Ingridient = () => {
  return (
    <div className={styles.box}>
      <Counter count={1} size='default'/>
      <img className='pl-4 pr-4 mb-1' src="https://code.s3.yandex.net/react/code/bun-02.png" alt="" />
      <CurrencyIcon type='primary'/>
      <p className="text text_type_digits-default">20</p>
      <p className={styles.itemName + " text text_type_main-default mt-1"}>Краторная булка N-200i</p>
    </div>
  )
}

export default Ingridient