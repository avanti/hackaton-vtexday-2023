import React, { Dispatch, SetStateAction, useState } from 'react'
import { MdLogout } from 'react-icons/md'
import { FaHome, FaRegMoneyBillAlt, FaUsers } from 'react-icons/fa'

import styles from './aside.css'
import { Pages } from '../../../pages/Dashboard'
import { Link } from 'vtex.render-runtime'

type AsideProps = {
  setPage: Dispatch<SetStateAction<Pages>>
} & React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Aside: React.FC<AsideProps> = ({setPage}) => {
  const [active, setActive] = useState<false | string>(false)

  const handleSetPage = (page: Pages, active: string) => {
    setPage(page)
    setActive(active)
  }

  return (
    <section className={styles.aside}>
      <main>
        <div className={active === 'Dashboard' ? styles.active : ''} onClick={() => handleSetPage('home', 'Dashboard')}><FaHome /> <p>Dashboard</p></div>
        <div className={active === 'MySales' ? styles.active : ''} onClick={() => handleSetPage('mySales', 'MySales')}><FaRegMoneyBillAlt /><p>Minhas Vendas</p> </div>
        <div className={active === 'Affiliateds' ? styles.active : ''} onClick={() => handleSetPage('affiliates', 'Affiliateds')}><FaUsers /><p>Afiliados</p> </div>      </main>
      <footer>
        <Link  className={styles.footerLink} to='/logout'><MdLogout /> Logout</Link>
      </footer>
    </section>
  )
}

export default Aside
