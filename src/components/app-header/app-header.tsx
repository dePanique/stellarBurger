import styles from "./app-header.module.css";
import HeaderListItem from "../header-list-item/header-list-item";
import { FC } from "react";

const AppHeader: FC = () => {

  return (
    <header className={styles.header}>
      <nav className={` pt-4 pb-4`}>
        <ul className={styles.row}>

          <li className={styles.element + " pl-5 pt-4 pr-5 pb-4 mr-2 "}>
            <HeaderListItem
              spanText="Конструктор"
            />
          </li>

          <li className={styles.element + " pl-5 pt-4 pr-5 pb-4 "}>
            <HeaderListItem
              spanText="Лента заказов"
            />
          </li>

          <li className={styles.link}>
            <HeaderListItem
              logo={true}
              spanText="Лого"
            />
          </li>

          <li className={styles.element + " pl-5 pt-4 pr-5 pb-4 "}>
            <HeaderListItem
              spanText="Личный кабинет"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
