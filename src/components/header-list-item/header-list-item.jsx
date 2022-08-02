import PropTypes from "prop-types";
import styles from "./header-list-item.module.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const HeaderListItem = ({ ...props }) => {
  const { pathname } = useLocation();

  const links = {
    "Конструктор": ["/", {
      primary: <BurgerIcon type="primary"/>,
      secondary: <BurgerIcon type="secondary"/>
    }],
    "Лента заказов": ["#", {
      primary: <ListIcon type="primary"/>,
      secondary: <ListIcon type="secondary"/>
    }],
    "Личный кабинет": ["/profile", {
      primary: <ProfileIcon type="primary"/>,
      secondary: <ProfileIcon type="secondary"/>
    }],
    "Лого": ["/", <Logo/>],
  }

  const linkPath = links[props.spanText][0];
  let itemIcon = links[props.spanText][1];

  useEffect(() => {

  }, [pathname])

  return props.logo ? (
    <li
      className={styles.link}
    >
      <Link
        to={{ pathname: "/" }}
        className={styles.logo}
      >
        {<Logo/>}
      </Link>
    </li>
  ) : (
    <li
      className={styles.element + " pl-5 pt-4 pr-5 pb-4 mt-4 mb-4"}
    >
      <NavLink
        exact to={{ pathname: linkPath }}
        className={styles.link + ' text text_type_main-default' + (pathname === linkPath ? '':' text_color_inactive')}
        activeClassName={' text_color_primary'}
      >
        {pathname === linkPath ? itemIcon.primary : itemIcon.secondary }
        {props.spanText}
      </NavLink>
    </li>
  );
};

HeaderListItem.propTypes = {
  logo: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.bool.isRequired,
  ]),
  spanText: PropTypes.string.isRequired,
  itemStyle: PropTypes.string,
  href: PropTypes.string,
};

export default HeaderListItem;
