import PropTypes from "prop-types";
import styles from "./header-list-item.module.css";
import { NavLink, Link, useLocation } from "react-router-dom";
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
      primary: <BurgerIcon type="primary" />,
      secondary: <BurgerIcon type="secondary" />
    }],
    "Лента заказов": ["#", {
      primary: <ListIcon type="primary" />,
      secondary: <ListIcon type="secondary" />
    }],
    "Личный кабинет": ["/profile", {
      primary: <ProfileIcon type="primary" />,
      secondary: <ProfileIcon type="secondary" />
    }],
    "Лого": ["/", <Logo />],
  }

  const linkPath = links[props.spanText][0];
  const itemIcon = links[props.spanText][1];

  return props.logo ? (
    <Link
      to={{ pathname: "/" }}
      className={styles.logo}
    >
      {<Logo />}
    </Link>
  ) : (
    <NavLink
      exact to={{ pathname: linkPath }}
      className={styles.link + ' text text_type_main-default ' + (pathname === linkPath ? '' : 'text_color_inactive')}
      activeClassName={'text_color_primary'}
    >
      {pathname === linkPath ? itemIcon.primary : itemIcon.secondary}
      {props.spanText}
    </NavLink>
  );
};

HeaderListItem.propTypes = {
  spanText: PropTypes.string.isRequired,
  href: PropTypes.string,
};

export default HeaderListItem;
