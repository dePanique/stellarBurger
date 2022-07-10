import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { portalContainer } from "./../../utils/constants";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";

const Modal = (props) => {
  useEffect(() => {
    const quitOnEscape = (e) => {
      if (e.key === "Escape") props.handle(false);
    };

    document.addEventListener("keydown", quitOnEscape);

    return () => {
      document.removeEventListener("keydown", quitOnEscape);
    };
  });

  return ReactDOM.createPortal(
    <ModalOverlay handle={props.handle}>
      <div className={styles.modalWindow}>
        <div
          className={styles.closeWrapper + " mt-15 mr-10"}
          onClick={() => props.handle()}
        >
          <CloseIcon />
        </div>
        {props.children}
      </div>
    </ModalOverlay>,
    portalContainer
  );
};

Modal.propTypes = {
  handle: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default Modal;
