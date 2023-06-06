import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './home.css'
import { Link } from 'vtex.render-runtime'
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { useLazyQuery } from 'react-apollo'
import { SessionSuccess, useRenderSession } from 'vtex.session-client'

import GET_AFFILIATE_SALES_DATA from '../../../graphql/queries/getAffiliateSalesData.gql'
import SkeletonLoader from '../../SkeletonLoader'
import { Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent'

type SalesData = {
  affiliateSales: number
  affiliateSalesComission: number
  month: string
  subAffiliatesSales: number
  subAffiliatesSalesComission: number
}

const MONTH = {
  0: 'Janeiro',
  1: 'Fevereiro',
  2: 'Março',
  3: 'Abril',
  4: 'Maio',
  5: 'Junho',
  6: 'Julho',
  7: 'Agosto',
  8: 'Setembro',
  9: 'Outubro',
  10: 'Novembro',
  11: 'Dezembro',

}


const yAxisFormatter = (values: number, _index: number) => {
  return formatter.format(values)
}

const tooltipTextFormatter = (label: keyof (typeof MONTH), _payload: Payload<ValueType, string | number>[]) => {

  return <p>{MONTH[label]}</p>
}

const xAxisFormatter = (values: keyof (typeof MONTH), _index: number) => {
  return MONTH[values]
}

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  currencyDisplay: 'symbol',
})

const Home: React.FC<React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement>> = () => {
  const [salesData, setSalesData] = useState<Array<SalesData>>()
  const [parentRef, setParentRef] = useState<HTMLDivElement>()
  const { session, loading, error } = useRenderSession()

  const [getAffiliatedSalesData, { data: affiliatedSalesData }] = useLazyQuery(GET_AFFILIATE_SALES_DATA, {
    ssr: false
  })

  useEffect(() => {
    if (!loading && session) {
      getAffiliatedSalesData({
        variables: {
          affiliateEmail: (session as SessionSuccess)?.namespaces?.authentication?.storeUserEmail.value || ''
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

  const parentWidth = () => {
    return parentRef?.clientWidth
  }
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

        <div ref={el => { el && setParentRef(el) }} className={styles.view3} id="chartContainer">
          {parentRef ? <LineChart width={parentWidth()} margin={{ top: 30, right: 20, left: 30, bottom: 15 }} height={350} data={salesData} className={styles.chart}>
            <XAxis dataKey="month" strokeWidth={0} stroke="#FFFC" padding={{ left: 8 }} tickFormatter={xAxisFormatter} />
            <YAxis yAxisId="right" strokeWidth={0} stroke="#FFFC" fontWeight={300} padding={{ bottom: 8 }} fontSize={10} tickFormatter={yAxisFormatter} />
            <YAxis yAxisId="left" strokeWidth={0} orientation='right' stroke="#FFFC" fontWeight={300} padding={{ bottom: 8 }} />

            <Tooltip itemStyle={{ color: "#000" }} labelFormatter={tooltipTextFormatter} />
            <Line yAxisId="left" name='Número de Vendas' type="monotone" dataKey="affiliateSales" stroke="#FFF" maskUnits="R$" />
            <Line yAxisId="right" name='Comissão (R$)' type="monotone" dataKey="affiliateSalesComission" stroke="#FFF" />
          </LineChart> : <SkeletonLoader className={styles.view3} />}

        </div>
      </> : <>
        <SkeletonLoader className={styles.view1} />
        <SkeletonLoader className={styles.view2} />
        <SkeletonLoader className={styles.view3} />
      </>}
    </section>
  )
}

export default Home
