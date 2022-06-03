import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = (props) => {
  useEffect(() => {
    const quitOnEscape = (e) => {
      if (e.key === "Escape") props.handle(false);
    };

    document.addEventListener("keydown", quitOnEscape);

    return () => {
      document.removeEventListener("keydown", quitOnEscape);
    };
  });

  return (
    <React.Fragment>
      <section
        className={styles.overLay}
        onClick={() => props.handle(false)}
      ></section>
      {props.children}
    </React.Fragment>
  );
};

ModalOverlay.propTypes = {
  handle: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
