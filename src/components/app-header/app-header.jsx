import styles from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderListItem from '../header-list-item/header-list-item'

const AppHeader = () => {

  return (
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
            spanText={'Лента заказов'}
            itemStyle={' ml-2'}
            isActive={false}
          />

          <HeaderListItem
            logo={<Logo />}
            spanText='logo'
            isActive={false}
          />

          <HeaderListItem
            icon={<ProfileIcon type='secondary'/>}
            spanText='Личный кабинет'
            isActive={false}
          />
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader