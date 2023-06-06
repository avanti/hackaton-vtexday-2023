import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './mySales.css'
import { Link } from 'vtex.render-runtime'
import { useLazyQuery } from 'react-apollo'
import { SessionSuccess, useRenderSession } from 'vtex.session-client'
import { EXPERIMENTAL_Table as Table, } from 'vtex.styleguide'

import GET_AFFILIATE_ORDERS from '../../../graphql/queries/getAffiliateOrders.gql'
import GET_AFFILIATE_SALES_DATA from '../../../graphql/queries/getAffiliateSalesData.gql'
import SkeletonLoader from '../../SkeletonLoader'
import {EXPERIMENTAL_useTableMeasures} from 'vtex.styleguide'

type OrderData = {
  orderId: string,
  orderDate: string,
  orderTotalValue: number,
  status: string,
  affiliate: {
    commissionAmount: number,
    amount: number,
  },
  sponsor: {
    amount: number,
    commissionAmount: number,
  }
}

type SalesData = {
  affiliateSales: number
  affiliateSalesComission: number
  month: string
  subAffiliatesSales: number
  subAffiliatesSalesComission: number
}

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  currencyDisplay: 'symbol',
})

const columns = [
  {
    id: 'orderId',
    title: 'Pedido',
  },
  {
    id: 'orderDate',
    title: 'Data de venda',
    cellRenderer: ({ data }: { data: {orderDate: string} }) => {
      return new Date(data.orderDate).toLocaleDateString()
    },
    extended: true,
  },
  {
    id: 'affiliate',
    title: 'Comissão',
    cellRenderer: ({ data }: { data: {amount: number, commissionAmount: number} }) => {
      return formatter.format(
        data.amount/100
      )
    },
  },
  {
    id: 'orderTotalValue',
    title: 'Total da venda',
    cellRenderer: ({ data }: { data: number }) => {
      return formatter.format(
        data/100
      )
    },
  }
]

const MySales: React.FC<React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement>> = () => {
  const [salesData, setSalesData] = useState<Array<SalesData>>()
  const [ordersData, setOrdersData] = useState<Array<OrderData>>()
  const { session, loading, error } = useRenderSession()

  const [getAffiliatedOrders, { data: affiliatedOrders }] = useLazyQuery(GET_AFFILIATE_ORDERS, {
    ssr: false
  })

  const [getAffiliatedSalesData, { data: affiliatedSalesData }] = useLazyQuery(GET_AFFILIATE_SALES_DATA, {
    ssr: false
  })

  useEffect(() => {
    if (!loading && session) {
      getAffiliatedOrders({
        variables: {
          input: {affiliateEmail: (session as SessionSuccess)?.namespaces?.authentication?.storeUserEmail?.value || ''}
        }
      })

      getAffiliatedSalesData({
        variables: {
          affiliateEmail: (session as SessionSuccess)?.namespaces?.authentication?.storeUserEmail?.value || ''
        }
      })
    }

  }, [session, loading, error])

  useEffect(() => {
    if (affiliatedSalesData?.getAffiliateSalesData?.monthlyPerformance?.length) {
      setSalesData(
        (affiliatedSalesData.getAffiliateSalesData.monthlyPerformance as SalesData[]).map((affiliateData: SalesData) => (
          {
            ...affiliateData,
            affiliateSalesComission: affiliateData.affiliateSalesComission / 100,
            subAffiliatesSalesComission: affiliateData.subAffiliatesSalesComission / 100
          }
        )).reverse()
      )
    }
  }, [affiliatedSalesData])

  useEffect(() => {
    if (affiliatedSalesData?.getAffiliateSalesData?.monthlyPerformance?.length) {
      setOrdersData(
        (affiliatedOrders.getAffiliateOrders.data as OrderData[]).map((affiliateData: OrderData) => (
          {
            ...affiliateData,
          }
        )).reverse()
      )
    }
  }, [affiliatedOrders])

  const measures = EXPERIMENTAL_useTableMeasures({ size: salesData?.length || 0 })

  return (
    <section className={styles.content}>
      {salesData?.length ? <>
        <div className={cn(styles.view1, styles.card)}>
          <p>Total a receber no mês</p>
          <p>{formatter.format(
            salesData[salesData.length - 1].affiliateSalesComission
          )}</p>
          <Link to='#'>Ver detalhes</Link>
        </div>
        <div className={cn(styles.view2, styles.card)}>
          <p>Número de vendas no mês</p>
          <p>{salesData[salesData.length - 1].affiliateSales}</p>
          <Link to='#'>Ver detalhes</Link>
        </div>

        <div className={styles.view3}>
         <Table
            measures={measures}
            items={ordersData}
            columns={columns}
          />
        </div>
      </> : <>
        <SkeletonLoader className={styles.view1} />
        <SkeletonLoader className={styles.view2} />
        <SkeletonLoader className={styles.view3} />
      </>}
    </section>
  )
}

export default MySales
