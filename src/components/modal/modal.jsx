import styles from './modal.module.css'
import ReactDOM  from 'react-dom'
import PropTypes from 'prop-types'
import ModalOverlay from '../modal-overlay/modal-overlay'
const portalContainer = document.querySelector('#modals')

const Modal = (props) => {

  return ReactDOM.createPortal(
    <ModalOverlay handle={props.handle}>
      <div className={styles.modalWindow}>
        <div className={styles.closeWrapper + ' mt-15 mr-10'} onClick={() => props.handle(false)}>
          <svg className={styles.close} width="18" height="18" viewBox="0 0 18 18"  xmlns="http://www.w3.org/2000/svg">
            <path d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L9 7.58579L16.2929 0.292893C16.6834 -0.0976311 17.3166 -0.0976311 17.7071 0.292893C18.0976 0.683417 18.0976 1.31658 17.7071 1.70711L10.4142 9L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L9 10.4142L1.70711 17.7071C1.31658 18.0976 0.683417 18.0976 0.292893 17.7071C-0.0976311 17.3166 -0.0976311 16.6834 0.292893 16.2929L7.58579 9L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#F2F2F3"/>
          </svg>
        </div>
        {props.children}
      </div>
    </ModalOverlay>
    ,
    portalContainer
  )
}

// Modal.propTypes = {
//   isActive: PropTypes.bool.isRequired,
//   closeModal: PropTypes.func.isRequired,
// }

export default Modal