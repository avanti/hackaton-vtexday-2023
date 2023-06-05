import React, { Dispatch, SetStateAction, useRef } from 'react'
import { MdClose } from 'react-icons/md'

import styles from './modal.css'

const Modal: React.FC<{ setOpenModal: Dispatch<SetStateAction<any>> }> = ({
  children,
  setOpenModal,
}) => {
  const ref = useRef(null)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOffModalClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation()

    if (event.nativeEvent.target === ref.current) {
      handleCloseModal()
    }
  }

  return (
    <section
      ref={ref}
      className={styles.modalWrapper}
      onClick={(e) => handleOffModalClick(e)}
    >
      <section className={styles.modal}>
        <button className={styles.closeModal} onClick={handleCloseModal}>
          <MdClose size={24} />
        </button>
        {children}
      </section>
    </section>
  )
}

export default Modal
