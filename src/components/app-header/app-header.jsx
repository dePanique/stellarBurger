import styles from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderListItem from '../header-list-item/header-list-item'


const AppHeader = () => {

  return(
    <header className={styles.header}>
      <nav>
        <ul className={styles.row + ' pt-4 pb-4'}>

          <HeaderListItem
            icon={<BurgerIcon type='primary'/>}
            spanText='Конструктор'
            isActive={true}
            />

          <HeaderListItem
            icon={<ListIcon type='secondary'/>}
            spanText='Лента заказов'
            itemStyle={' ml-2'}
            />

          <HeaderListItem
            logo={<Logo />}
            />

          <HeaderListItem
            icon={<ProfileIcon type='secondary'/>}
            spanText='Личный кабинет'
            />

        </ul>
      </nav>
    </header>
  )
}

export default AppHeader