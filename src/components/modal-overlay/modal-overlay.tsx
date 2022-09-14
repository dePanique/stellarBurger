import React, { FC } from "react";
import { IModalOverLay } from "../../utils/type";
import styles from "./modal-overlay.module.css";

const ModalOverlay: FC<IModalOverLay> = (props) => {

  const handleClick = (): void => {
    props.handle(false);
  };

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