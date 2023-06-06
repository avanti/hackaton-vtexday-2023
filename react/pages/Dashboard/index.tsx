import React, { useEffect, useState } from 'react'
import cn from 'classnames'


/* Imports */
import { SessionSuccess, useRenderSession } from 'vtex.session-client'

/* Queries */
//import EXAMPLE from '../../graphql/example.gql'

/* Mutations */

/* Styles */
import styles from './dashboard.css'
import Aside from '../../components/Dashboard/Aside'
import Home from '../../components/Dashboard/Home'
import MySales from '../../components/Dashboard/MySales'
import Client from '../../components/Dashboard/Client'
import Affiliates from '../../components/Dashboard/Affiliates'
import { useRuntime } from 'vtex.render-runtime'

export type Pages = 'home' | 'mySales' | 'affiliates'

const renderPage = {
  'home': <Home className={styles.content} />,
  'mySales': <MySales className={styles.content} />,
  'affiliates': <Affiliates className={styles.content} />
} as const

export default () => {
  const [page, setPage] = useState<Pages>('home')
  const { session, loading, error } = useRenderSession()
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)
  const runtime = useRuntime()

  useEffect(() => {
    if (!loading && session) {
      const isLoggedId = !!(session as SessionSuccess)?.namespaces?.authentication?.storeUserEmail?.value
      if (!isLoggedId) {
        runtime.navigate({to: `login?returnUrl=${document.location.origin}${runtime.history?.location.pathname}`})
      } else {
        setUserLoggedIn(true)
      }
    }
  }, [session, loading, error])

  return (
    <section className={cn(styles.appWrapper)}>
      {userLoggedIn ?
        <>
          <Aside className={styles.aside} setPage={setPage} />
          {
            renderPage[page]
          }
          <Client className={styles.client} />
        </>
        : null}

    </section>
  )
}
