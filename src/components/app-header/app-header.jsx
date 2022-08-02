import { useState } from "react";
import HeaderListItem from "../header-list-item/header-list-item";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.row + " pt-4 pb-4 text_color_primary "}>
          <HeaderListItem
            spanText="Конструктор"
            href="/"
          />

          <HeaderListItem
            spanText="Лента заказов"
            href="#"
          />

          <HeaderListItem
            logo
            spanText="Лого"
          />

          <HeaderListItem
            spanText="Личный кабинет"
            href="/profile"

          />
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
