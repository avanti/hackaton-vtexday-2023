import { ResolverError } from '@vtex/api'

import type {
  AffiliateOrder,
  SearchResult,
  AffiliateMonthlySalesData,
} from '../typings'

export const getAffiliateSalesDataLogic = async (
  affiliateId: String,
  ctx: Context
): Promise<{ monthlyPerformance: AffiliateMonthlySalesData[] }> => {
  const {
    clients: { masterdata },
  } = ctx

  const startDateObj = new Date()
  startDateObj.setMonth(startDateObj.getMonth() - 5)
  startDateObj.setDate(1)
  const startDate = startDateObj.toISOString().slice(0, 10)

  try {
    let affiliateOrdersSearch: SearchResult<AffiliateOrder>

    affiliateOrdersSearch = await masterdata.searchDocumentsWithPaginationInfo<
      AffiliateOrder
    >({
      dataEntity: 'affiliateOrders',
      schema: 'affiliateOrders',
      pagination: {
        page: 1,
        pageSize: 999,
      },
      sort: 'orderDate DESC',
      where: `affiliate.id=${affiliateId} AND (status<>"payment-pending" OR status<>"canceled") AND orderDate>${startDate}`,
      fields: ['orderId,orderDate,orderTotalValue,status,affiliate,sponsor'],
    })

    for (
      let i = 2;
      i <= Math.ceil(affiliateOrdersSearch.pagination.total / 999);
      i++
    ) {
      const affiliateOrdersRefetch = await masterdata.searchDocumentsWithPaginationInfo<
        AffiliateOrder
      >({
        dataEntity: 'affiliateOrders',
        schema: 'affiliateOrders',
        pagination: {
          page: i,
          pageSize: 999,
        },
        sort: 'orderDate DESC',
        where: `affiliate.id=${affiliateId} AND (status<>"payment-pending" OR status<>"canceled") AND orderDate>${startDate}`,
        fields: ['orderId,orderDate,orderTotalValue,status,affiliate,sponsor'],
      })

      affiliateOrdersSearch.data.push(...affiliateOrdersRefetch.data)
      affiliateOrdersSearch.pagination = affiliateOrdersRefetch.pagination
    }

    let subAffiliateOrdersSearch: SearchResult<AffiliateOrder>

    subAffiliateOrdersSearch = await masterdata.searchDocumentsWithPaginationInfo<
      AffiliateOrder
    >({
      dataEntity: 'affiliateOrders',
      schema: 'affiliateOrders',
      pagination: {
        page: 1,
        pageSize: 999,
      },
      sort: 'orderDate DESC',
      where: `sponsor.id=${affiliateId} AND (status<>"payment-pending" OR status<>"canceled") AND orderDate>${startDate}`,
      fields: ['orderId,orderDate,orderTotalValue,status,affiliate,sponsor'],
    })

    for (
      let i = 2;
      i <= Math.ceil(subAffiliateOrdersSearch.pagination.total / 999);
      i++
    ) {
      const subAffiliateOrdersRefetch = await masterdata.searchDocumentsWithPaginationInfo<
        AffiliateOrder
      >({
        dataEntity: 'affiliateOrders',
        schema: 'affiliateOrders',
        pagination: {
          page: i,
          pageSize: 999,
        },
        sort: 'orderDate DESC',
        where: `sponsor.id=${affiliateId} AND (status<>"payment-pending" OR status<>"canceled") AND orderDate>${startDate}`,
        fields: ['orderId,orderDate,orderTotalValue,status,affiliate,sponsor'],
      })

      subAffiliateOrdersSearch.data.push(...subAffiliateOrdersRefetch.data)
      subAffiliateOrdersSearch.pagination = subAffiliateOrdersRefetch.pagination
    }

    const currentMonth = new Date().getMonth().toString()
    const oneMonthBack = (new Date().getMonth() - 1).toString()
    const twoMonthsBack = (new Date().getMonth() - 2).toString()
    const threeMonthsBack = (new Date().getMonth() - 3).toString()
    const fourMonthsBack = (new Date().getMonth() - 4).toString()
    const fiveMonthsBack = (new Date().getMonth() - 5).toString()

    const ordersPerMonth: Record<string, Array<AffiliateOrder>> = {
      [currentMonth]: [],
      [oneMonthBack]: [],
      [twoMonthsBack]: [],
      [threeMonthsBack]: [],
      [fourMonthsBack]: [],
      [fiveMonthsBack]: [],
    }

    affiliateOrdersSearch.data.map((order) => {
      const orderMonth = new Date(order.orderDate).getMonth().toString()

      ordersPerMonth[orderMonth].push(order)
    })

    subAffiliateOrdersSearch.data.map((order) => {
      const orderMonth = new Date(order.orderDate).getMonth().toString()

      ordersPerMonth[orderMonth].push(order)
    })

    const response = Object.keys(ordersPerMonth).map((month) => {
      return {
        month,
        affiliateSales: ordersPerMonth[month].filter(
          (order: AffiliateOrder) => order.affiliate.id === affiliateId
        ).length,
        subAffiliatesSales: ordersPerMonth[month].filter(
          (order: AffiliateOrder) => order.sponsor?.id === affiliateId
        ).length,
        affiliateSalesComission: ordersPerMonth[month].reduce(
          (acc: number, currentOrder: AffiliateOrder) => {
            if (currentOrder.affiliate.id) {
              return acc + currentOrder.affiliate.amount
            }

            return acc
          },
          0
        ),
        subAffiliatesSalesComission: ordersPerMonth[month].reduce(
          (acc: number, currentOrder: AffiliateOrder) => {
            if (currentOrder.sponsor?.id) {
              return acc + currentOrder.sponsor.amount
            }

            return acc
          },
          0
        ),
      }
    })

    return {
      monthlyPerformance: response.reverse(),
    }
  } catch (e) {
    console.log(e)
    throw new ResolverError('Failed to get data')
  }
}
