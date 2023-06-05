import React, { useState } from 'react'
import { MdLogout } from 'react-icons/md'
import { FaCreditCard, FaHome, FaRegMoneyBillAlt, FaUser, FaUsers } from 'react-icons/fa'

import styles from './aside.css'

const Aside: React.FC<React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement>> = () => {
  const [active, setActive] = useState<false | string>(false)

  return (
    <section className={styles.aside}>
      <main>
        <div className={active === 'Dashboard' ? styles.active : ''} onClick={() => setActive('Dashboard')}><FaHome /> <p>Dashboard</p></div>
        <div className={active === 'PaymentMethods' ? styles.active : ''} onClick={() => setActive('PaymentMethods')}><FaCreditCard /> <p>Ajustes de pagamento</p> </div>
        <div className={active === 'MySales' ? styles.active : ''} onClick={() => setActive('MySales')}><FaRegMoneyBillAlt /><p>Minhas Vendas</p> </div>
        <div className={active === 'Affiliateds' ? styles.active : ''} onClick={() => setActive('Dashboard3')}><FaUsers /><p>Afiliados</p> </div>
        <div className={active === 'MyAccount' ? styles.active : ''} onClick={() => setActive('MyAccount')}><FaUser /><p>Minha Conta</p> </div>
      </main>
      <footer>
        <MdLogout /> Logout
      </footer>
    </section>
  )
}

export default Aside
