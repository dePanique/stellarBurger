import Main from "../components/main/main"
import styles from './page404.module.css'

export const Page404 = () => {
  return (
    <Main >
      <div className={styles.column}>
        <h1 className={styles.warning + ` text text_type_main-large mb-6`}>
          {"Ошибка 404"}
        </h1>
        <h2 className={styles.explanation + ` text text_type_main-medium`}>
          {"Такой страницы нет!"}
        </h2>
      </div>
    </Main>
  )
}