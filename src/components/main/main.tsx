import { FC, ReactNode } from "react";
import styles from "./main.module.css";

interface IMain {
  children: ReactNode
}

const Main: FC<IMain> = (props) => {

  return (
    <main className={styles.main}>
      {props.children}
    </main>
  )
};

export default Main;