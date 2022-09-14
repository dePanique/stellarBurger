import styles from "./header-list-item.module.css";
import { FC, ReactNode } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface IHeaderListItem {
  spanText: "Конструктор" | "Лента заказов" | "Личный кабинет" | "Лого";
  logo?: boolean;
}

const HeaderListItem: FC<IHeaderListItem> = ({ spanText, logo  }) => {

  const { pathname } = useLocation();

  const links: {[name: string]: [string, {[name:string] : ReactNode}]} = {
    "Конструктор": ["/", {
      primary: <BurgerIcon type="primary" />,
      secondary: <BurgerIcon type="secondary" />
    }],
    "Лента заказов": ["/feed", {
      primary: <ListIcon type="primary" />,
      secondary: <ListIcon type="secondary" />
    }],
    "Личный кабинет": ["/profile", {
      primary: <ProfileIcon type="primary" />,
      secondary: <ProfileIcon type="secondary" />
    }],
    "Лого": ["/", {
      primary: <Logo />,
      secondary: <Logo />
    }],
  }

  const linkPath = links[spanText][0];
  const itemIcon = links[spanText][1];

  return logo ? (
    <Link
      to={{ pathname: "/" }}
      className={styles.logo}
    >
      {<Logo />}
    </Link>
  ) : (
    <NavLink
      exact to={{ pathname: linkPath , state : pathname}}
      className={styles.link + ' text text_type_main-default ' + (pathname === linkPath ? '' : 'text_color_inactive')}
      activeClassName={'text_color_primary'}
    >
      {pathname === linkPath ? itemIcon.primary : itemIcon.secondary}
      {spanText}
    </NavLink>
  );
};

export default HeaderListItem;
