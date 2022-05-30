import styles from './modal-overlay.module.css'
import ReactDOM from 'react-dom'
import React, {useState, useEffect} from 'react'

const modalWindow = document.querySelector('#modals')


const ModalOverlay = (props) => {
  console.log(props.isActive)
  function modalHandler(e) {
    console.log(e.key)
    console.log(props.isActive)

    if (e.key === 'Escape') {
      props.func()
      console.log(props.isActive)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      e.preventDefault()
      modalHandler(e)
    })

    return document.removeEventListener('keydown', (e) => {
      e.preventDefault()
      modalHandler(e)
    })
  },[])

  return ReactDOM.createPortal(
    props.isActive &&
    <section className={styles.overLay}>
      {props.children}
    </section>
    ,
    modalWindow
  )
}

export default ModalOverlay