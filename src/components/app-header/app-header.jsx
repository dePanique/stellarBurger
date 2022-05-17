import styles from './app-header.module.css'
import { Logo, Typography, Icons, Box, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const AppHeader = () => {
  return(
    <header className={styles.header}>
      <nav>
        <ul className={styles.row + ' pt-4 pb-4'}>
          <li className={styles.element + ' pl-5 pr-5'}>
            <BurgerIcon type='primary'/>
            <a href="#" className={styles.link + ' text text_type_main-default text_color_primary ml-2'}>Конструктор</a>
          </li>
          <li className={styles.element + ' pl-5 pr-5 ml-2'}>
            <ListIcon type='secondary'/>
            <a href="#" className={styles.link + ' text text_type_main-default text_color_inactive ml-2'}>Лента заказов</a>
          </li>
          <li className={styles.element}>
            <Logo />
          </li>
          <li className={styles.element + ' pl-5 pr-5'}>
            <ProfileIcon type='secondary'/>
            <a href="#" className={styles.link + ' text text_type_main-default text_color_inactive ml-2'}>Личный кабинет</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;