import React from 'react'
import type { SessionSuccess } from 'vtex.session-client'
import { useRenderSession } from 'vtex.session-client'

import styles from './link.css'
import LinkIcon from './LinkIcon'

function AffiliatedLink(): JSX.Element {
  const { session } = useRenderSession()

  const isAuthenticated = (session as SessionSuccess)?.namespaces?.profile
    ?.isAuthenticated?.value

  return (
    <div className={styles.affiliatedLinkContainer}>
      <LinkIcon />
      <a
        className={styles.affiliatedLink}
        href={
          isAuthenticated === 'true'
            ? '/affiliated-dashboard'
            : '/affiliated-program'
        }
      >
        Área do Afiliado
      </a>
    </div>
  )
}

export default AffiliatedLink
