import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { portalContainer } from "./../../utils/constants";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Modal = (props) => {

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