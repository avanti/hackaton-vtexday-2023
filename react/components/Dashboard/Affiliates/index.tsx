import React, { useEffect, useState } from 'react'
import styles from './affiliates.css'
import { useLazyQuery } from 'react-apollo'
import { SessionSuccess, useRenderSession } from 'vtex.session-client'
import { EXPERIMENTAL_Table as Table, } from 'vtex.styleguide'

import GET_SUBAFFILIATES from '../../../graphql/queries/getSubAffiliatesData.gql'
import { EXPERIMENTAL_useTableMeasures } from 'vtex.styleguide'

type Subaffiliate = {
  name: string,
  sold: number,
  status: "APPROVED" | "PENDING" | "DENIED"
}


type TranslatedSubaffiliate = {
  name: string,
  sold: number,
  status: "Aprovado" | "Pendente" | "Negado"
}

const affiliatedStatus = {
  "APPROVED": "Aprovado",
  "PENDING": "Pendente",
  "DENIED": "Negado"
} as const


const columns = [
  {
    id: 'name',
    title: 'Nome',
  },
  {
    id: 'sold',
    title: 'Vendas',
  },
  {
    id: 'status',
    title: 'Status',
  }
]

const Affiliates: React.FC<React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement>> = () => {
  const [subAffiliates, setSubAffiliates] = useState<Array<TranslatedSubaffiliate>>()
  const { session, loading, error } = useRenderSession()

  const [getSubAffiliates, { data: subAffiliatesData, loading: subAffiliatesLoading }] = useLazyQuery(GET_SUBAFFILIATES, {
    ssr: false
  })


  useEffect(() => {
    if (!loading && session) {
      getSubAffiliates({
        variables: {
          input:{ affiliateEmail: (session as SessionSuccess)?.namespaces?.authentication?.storeUserEmail?.value,  pagination: { page: 1, pageSize: 30 }}
        }
      })
    }
  }, [session, loading, error])


  useEffect(() => {
    if (subAffiliatesData) {
      setSubAffiliates(
        (subAffiliatesData.getSubAffiliatesData as Subaffiliate[]).map((subAffiliateData: Subaffiliate) => (
          {
            ...subAffiliateData,
            status: affiliatedStatus[subAffiliateData['status']]
          }
        )).reverse()
      )
      
    }
  }, [subAffiliatesData])

  const measures = EXPERIMENTAL_useTableMeasures({ size: subAffiliates?.length || 0 })

  return (

    <section className={styles.affiliatesContent}>
        <div className={styles.view}>
          <Table
            loading={subAffiliatesLoading}
            measures={measures}
            items={subAffiliates}
            columns={columns}
          />
        </div>
    </section>
  )
}

export default Affiliates
