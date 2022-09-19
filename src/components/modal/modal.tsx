import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { portalContainer } from "../../utils/constants";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect } from "react";
import { IModal } from "../../utils/type";

const Modal: FC<IModal> = ({ history, children, closeOrderModal }) => {

  const closeModal = (): void => {
    if (closeOrderModal) {
      return closeOrderModal(false);
    }

    history.goBack();
  };

  useEffect(() => {
    const quitOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      };
    };

    document.addEventListener("keydown", quitOnEscape);

    return () => {
      document.removeEventListener("keydown", quitOnEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay handle={closeModal}>
      <div className={styles.modalWindow}>
        <div
          className={styles.closeWrapper + " mt-15 mr-10"}
          onClick={closeModal}
        >
          <CloseIcon type='primary' />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    portalContainer as HTMLElement
  );
};

export default Modal;
