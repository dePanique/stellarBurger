import styles from './modal-overlay.module.css'
import ReactDOM from 'react-dom'
import React, {useState, useEffect} from 'react'

const ModalOverlay = (props) => {
  useEffect(() => {
    const quitOnEscape = (e) => {
      if (e.key === 'Escape') props.handleOverlay()
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
    <section className={styles.overLay} onClick={() => props.handleOverlay()}>
    </section>
    ,
    props.portalContainer
  )
}

export default ModalOverlay