import { NotFoundError, ResolverError } from '@vtex/api'

import type {
  SearchResult,
  AffiliateOrder,
  GetAffiliateOrdersInput,
  Affiliate,
} from '../typings'

export const getAffiliateOrdersLogic = async (
  input: GetAffiliateOrdersInput,
  ctx: Context
): Promise<SearchResult<AffiliateOrder>> => {
  const { affiliateEmail, pagination, ordersFrom, dateFrom } = input
  const {
    clients: { masterdata },
  } = ctx

  let affiliateSearch: Affiliate[]

  try {
    affiliateSearch = await masterdata.searchDocuments<Affiliate>({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      fields: ['affiliateId'],
      pagination: {
        page: 1,
        pageSize: 1,
      },
      where: `email=${affiliateEmail}`,
    })
  } catch {
    throw new ResolverError('Failed to get affiliate orders')
  }

  if (!affiliateSearch.length) {
    throw new NotFoundError('Affiliate not found')
  }

  const { affiliateId } = affiliateSearch[0]

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
