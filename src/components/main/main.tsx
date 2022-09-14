import { FC } from "react";
import { IMain } from "../../utils/type";
import styles from "./main.module.css";

const Main: FC<IMain> = (props) => {

  return (
    <main className={styles.main}>
      {props.children}
    </main>
  )
};

export default Main;