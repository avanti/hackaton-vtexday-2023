import React from 'react'

import styles from './client.css'
import { FaUser } from 'react-icons/fa'
import { MdContentCopy } from 'react-icons/md'

const Client: React.FC<React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement>> = () => {


  return (
    <section className={styles.client}>
      <div className={styles.profileWrapper}>
        <div className={styles.profilePicWrapper}>
          <FaUser size={48} style={{ backgroundColor: "#FFF", borderRadius: "50%", padding: "0.8rem" }} />
        </div>
        <p className={styles.profileName}>client Name from baviera</p>
        <p className={styles.profileSince}>membro desde 1945</p>
      </div>

      <div className={styles.coupomWrapper}>
        <p className={styles.coupomCallText}>Código de cupom</p>
        <div className={styles.coupom}><p>Code</p><MdContentCopy size={16} color='#707070' /></div>
      </div>

    </section>
  )
}

export default Client
