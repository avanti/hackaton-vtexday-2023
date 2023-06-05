import React from 'react'
import cn from 'classnames'


/* Imports */
//import { useQuery } from 'react-apollo'

/* Queries */
//import EXAMPLE from '../../graphql/example.gql'

/* Mutations */

/* Styles */
import styles from './dashboard.css'
import Aside from '../../components/Dashboard/Aside'
import Home from '../../components/Dashboard/Home'
import Client from '../../components/Dashboard/Client'

export default () => {



  return (
    <section className={cn(styles.appWrapper)}>
      <Aside className={styles.aside} />
      <Home  className={styles.content}/>
      <Client className={styles.client}/>
    </section>
  )
}
