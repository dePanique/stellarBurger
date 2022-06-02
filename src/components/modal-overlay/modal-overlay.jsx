import { useEffect } from 'react'
import { PropTypes } from 'prop-types'
import styles from './modal-overlay.module.css'
import ReactDOM from 'react-dom'

const ModalOverlay = (props) => {

  useEffect(() => {
    const quitOnEscape = (e) => {
      if (e.key === 'Escape') props.handleOverlay(false)
    }

    if (props.isActive === true) {
      document.addEventListener('keydown', quitOnEscape)
    }

    return () => {
      document.removeEventListener('keydown', quitOnEscape)
    }
  })

  return ReactDOM.createPortal(
    props.isActive &&
    <section className={styles.overLay} onClick={() => props.handleOverlay(false)}>
    </section>
    ,
    props.portalContainer
  )
}

ModalOverlay.propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleOverlay: PropTypes.func.isRequired,
  portalContainer: PropTypes.object.isRequired
}

export default ModalOverlay