import React, { useState } from 'react'
import type { SessionSuccess } from 'vtex.session-client'
import { useRenderSession } from 'vtex.session-client'
import { useQuery } from 'react-apollo'

import type { Affiliate } from '../../../node/typings/affiliate'
import styles from './link.css'
import LinkIcon from './LinkIcon'
import GET_AFFILIATE_BY_EMAIL from '../../graphql/queries/getAffiliateByMail.gql'

function AffiliatedLink(): JSX.Element {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null)
  const { session } = useRenderSession()

  const isAuthenticated = (session as SessionSuccess)?.namespaces?.profile
    ?.isAuthenticated?.value

  const sessionMail = (session as any)?.namespaces?.profile?.email?.value

  const { data: affiliateData } = useQuery(GET_AFFILIATE_BY_EMAIL, {
    variables: { affiliateMail: sessionMail },
    ssr: false,
    onCompleted: () => {
      setAffiliate((affiliateData?.getAffiliateByMail as Affiliate) ?? null)
    },
  })

  const resolvedLink =
    isAuthenticated === 'true' && affiliate
      ? '/affiliated-dashboard'
      : '/affiliated-program'

  return (
    <div className={styles.affiliatedLinkContainer}>
      <LinkIcon />
      <a className={styles.affiliatedLink} href={resolvedLink}>
        Área do Afiliado
      </a>
    </div>
  )
}

export default AffiliatedLink
