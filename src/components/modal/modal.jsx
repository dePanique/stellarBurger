import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { portalContainer } from "./../../utils/constants";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";

const Modal = ({ closeOrderModal, ...props }) => {

  const closeModal = () => {
    if (closeOrderModal) {
      return closeOrderModal(false);
    }
    props.history.goBack();
  }

  useEffect(() => {
    const quitOnEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      };
    };

    document.addEventListener("keydown", quitOnEscape);

    return () => {
      document.removeEventListener("keydown", quitOnEscape);
    };
  });

  return ReactDOM.createPortal(
    <ModalOverlay handle={closeModal}>
      <div className={styles.modalWindow}>
        <div
          className={styles.closeWrapper + " mt-15 mr-10"}
          onClick={closeModal}
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
  handle: PropTypes.func,
  children: PropTypes.element,
};

export default Modal;
