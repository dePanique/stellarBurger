import { useState } from "react";
import HeaderListItem from "../header-list-item/header-list-item";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  const [isActive, setIsActive] = useState([true, false, false])

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.row + " pt-4 pb-4"}>
          <HeaderListItem
            icon={isActive[0] ? <BurgerIcon type="primary" /> : <BurgerIcon type="secondary"/>}
            spanText="Конструктор"
            href="/"
            isActive={isActive[0]}
            setIsActive={() => setIsActive([true, false, false])}
          />

          <HeaderListItem
            icon={isActive[1] ? <ListIcon type="primary" /> : <ListIcon type="secondary" />}
            spanText={"Лента заказов"}
            href="#"
            itemStyle={" ml-2"}
            isActive={isActive[1]}
            setIsActive={() => setIsActive([false, true, false])}
          />

          <HeaderListItem
            logo={<Logo />}
            spanText="logo"
            isActive={false}
            setIsActive={() => setIsActive([true, false, false])}
          />

          <HeaderListItem
            icon={isActive[2] ? <ProfileIcon type="primary" /> : <ProfileIcon type="secondary" />}
            spanText="Личный кабинет"
            href="/profile"
            isActive={isActive[2]}
            setIsActive={() => setIsActive([false, false, true])}
          />
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
