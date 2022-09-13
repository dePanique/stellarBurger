import React, { FC, ReactNode } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverLay {
  handle: (arg: boolean) => void;
  children: ReactNode;
}

const ModalOverlay: FC<IModalOverLay> = (props) => {

  const handleClick = (): void => {
    props.handle(false)
  }

  return (
    <React.Fragment>
      <section
        className={styles.overLay}
        onClick={handleClick}
      ></section>
      {props.children}
    </React.Fragment>
  );
};

export default ModalOverlay;