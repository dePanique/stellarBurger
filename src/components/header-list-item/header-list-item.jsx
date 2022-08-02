import PropTypes from "prop-types";
import styles from "./header-list-item.module.css";
import { Link } from "react-router-dom";

const HeaderListItem = ({ ...props }) => {
  const links = {
    "Конструктор": "/",
    "Лента заказов": "#",
    "Личный кабинет": "/profile",
  }

  return props.logo ? (
    <li
      className={styles.logo}
      onClick={() => props.setIsActive()}
    >
      <Link
        to={{ pathname: "/" }}
        className={styles.link}>
        {props.logo}
      </Link>
    </li>
  ) : (
    <li
      className={
        styles.element +
        " pl-5 pt-4 pr-5 pb-4" +
        (props.itemStyle ? props.itemStyle : "")
      }
      onClick={() => props.setIsActive()}
    >
      <Link
        to={{ pathname: `${links[props.spanText]}` }}
        className={
          props.isActive ? (
            styles.link + ' text_type_main-default text text_color_primary'
          ) : (
            styles.link + ' text_type_main-default text text_color_inactive'
          )
        }
      >
        {props.icon}
        {props.spanText}
      </Link>
    </li>
  );
};

HeaderListItem.propTypes = {
  logo: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.bool.isRequired,
  ]),
  icon: PropTypes.element,
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func,
  spanText: PropTypes.string.isRequired,
  itemStyle: PropTypes.string,
  href: PropTypes.string,
};

export default HeaderListItem;
