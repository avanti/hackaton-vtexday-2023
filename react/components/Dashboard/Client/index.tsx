import React, { useEffect } from 'react'

import styles from './client.css'
import { FaUser } from 'react-icons/fa'
import { MdContentCopy } from 'react-icons/md'

import { SessionSuccess, useRenderSession } from 'vtex.session-client'
import { useLazyQuery } from 'react-apollo'

import GET_AFFILIATE_BY_EMAIL from '../../../graphql/queries/getAffiliateByMail.gql'
import SkeletonLoader from '../../SkeletonLoader'

const Client: React.FC<React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement>> = () => {
  const { session, loading, error } = useRenderSession()

  const [getAffiliateByMail, { data: affiliatedByEmail }] = useLazyQuery(GET_AFFILIATE_BY_EMAIL, {
    ssr: false
  })

  useEffect(() => {
    if (!loading && session) {
      getAffiliateByMail({
        variables: {
          affiliateMail: (session as SessionSuccess)?.namespaces?.authentication?.storeUserEmail?.value || ''
        }
      })
    }
  }, [session, loading, error])

  return (
    <section className={styles.client}>
      {affiliatedByEmail?.getAffiliateByMail ? <>
        <div className={styles.profileWrapper}>
        <div className={styles.profilePicWrapper}>
          <FaUser size={48} style={{ backgroundColor: "#FFF", borderRadius: "50%", padding: "0.8rem" }} />
        </div>
        <p className={styles.profileName}>{affiliatedByEmail.getAffiliateByMail.name}</p>
        <p className={styles.profileSince}>Membro desde {' '}{ new Date(affiliatedByEmail.getAffiliateByMail.createdIn).getFullYear()}</p>
      </div>

      <div className={styles.coupomWrapper}>
        <p className={styles.coupomCallText}>Código de cupom</p>
        <div className={styles.coupom}><p>{affiliatedByEmail.getAffiliateByMail.affiliateCode}</p><MdContentCopy className={styles.copyButton} onClick={() => navigator.clipboard.writeText(`${affiliatedByEmail.getAffiliateByMail.affiliateCode}`)} size={16} color='#707070' title='Copiar'/></div>
      </div>
      </> : <SkeletonLoader className=''/>}
    </section>
  )
}

export default Client
