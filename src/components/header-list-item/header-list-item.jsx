import styles from './header-list-item.module.css'

const HeaderListItem = (props) => {
  return (
    props.logo ?
    <li className={styles.logo}>
      <a href={(props.href || "#")} className={styles.link}>{props.logo}</a>
    </li>
    :
    <li className={styles.element + ' pl-5 pt-4 pr-5 pb-4' + (props.itemStyle ? props.itemStyle : '')}>
      <a href={(props.href || "#")} className={styles.link + ' ml-2 '}>
        {props.icon}
        <span className={(props.isActive && ' text_color_primary ' || 'text_color_inactive ') + ' ml-2 text text_type_main-default'}>{props.spanText}</span>
      </a>
    </li>
  )
}

export default HeaderListItem