import { ResolverError } from '@vtex/api'

import type {
  SearchResult,
  AffiliateOrder,
  GetAffiliateOrdersInput,
} from '../typings'

export const getAffiliateOrdersLogic = async (
  input: GetAffiliateOrdersInput,
  ctx: Context
): Promise<SearchResult<AffiliateOrder>> => {
  const { affiliateId, pagination, ordersFrom, dateFrom } = input
  const {
    clients: { masterdata },
  } = ctx

  let whereField: string

  switch (ordersFrom) {
    case 'AFFILIATE':
      whereField = `affiliate.id=${affiliateId}`
      break
    case 'SUBAFFILIATES':
      whereField = `sponsor.id=${affiliateId}`
      break
    case 'ALL':
      whereField = `affiliate.id=${affiliateId} OR sponsor.id=${affiliateId}`
      break
    default:
      whereField = `affiliate.id=${affiliateId}`
  }

  if (dateFrom) {
    whereField = `(${whereField}) AND orderDate>${dateFrom}`
  }

  try {
    const affiliateOrdersSearch = await masterdata.searchDocumentsWithPaginationInfo<
      AffiliateOrder
    >({
      dataEntity: 'affiliateOrders',
      schema: 'affiliateOrders',
      pagination: {
        page: pagination?.page ?? 1,
        pageSize: pagination?.page ?? 15,
      },
      fields: ['orderId,orderDate,orderTotalValue,status,affiliate,sponsor'],
      where: whereField,
    })

    return affiliateOrdersSearch
  } catch {
    throw new ResolverError('Failed to get affiliate orders')
  }
}
