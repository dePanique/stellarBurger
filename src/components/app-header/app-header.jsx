import styles from "./app-header.module.css";
import { useEffect, useState } from "react";
import HeaderListItem from "../header-list-item/header-list-item";
import { useDispatch } from "react-redux";
import { authenticationEnch } from "../../services/actions/auth";

const AppHeader = () => {

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.row + " pt-4 pb-4 "}>

          <li className={styles.element + " pl-5 pt-4 pr-5 pb-4 "}>
            <HeaderListItem
              spanText="Конструктор"
              href="/"
            />
          </li>

          <li className={styles.element + " pl-5 pt-4 pr-5 pb-4 "}>
            <HeaderListItem
              spanText="Лента заказов"
              href="#"
            />
          </li>

          <li className={styles.link}>
            <HeaderListItem
              logo
              spanText="Лого"
            />
          </li>

          <li className={styles.element + " pl-5 pt-4 pr-5 pb-4 "}>
            <HeaderListItem
              spanText="Личный кабинет"
              href="/profile"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
