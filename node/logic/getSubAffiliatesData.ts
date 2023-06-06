import { ResolverError } from '@vtex/api'

import type {
  Affiliate,
  GetSubAffiliatesDataInput,
  SearchResult,
} from '../typings'
import { SubAffiliatesInfo } from '../typings/affiliate'

export const getSubAffiliatesDataLogic = async (
  input: GetSubAffiliatesDataInput,
  ctx: Context
): Promise<any> => {
  const { affiliateEmail, pagination } = input
  const {
    clients: { masterdata },
  } = ctx

  try {
    let subAffiliates: SearchResult<Affiliate>

    subAffiliates = await masterdata.searchDocumentsWithPaginationInfo<
      Affiliate
    >({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      pagination: {
        page: pagination?.page ?? 1,
        pageSize: pagination?.pageSize ?? 15,
      },
      fields: ['affiliateId,name,status'],
      where: `sponsor.email=${affiliateEmail}`,
    })

    let subAffiliatesData: SubAffiliatesInfo[] = []

    for (const subAffiliate of subAffiliates.data) {
      const subAffiliateSales = await masterdata.searchDocumentsWithPaginationInfo(
        {
          dataEntity: 'affiliateOrders',
          schema: 'affiliateOrders',
          pagination: {
            page: 1,
            pageSize: 1,
          },
          where: `affiliate.id=${subAffiliate.affiliateId} AND (status<>"payment-pending" OR status<>"canceled")`,
          fields: ['orderId'],
        }
      )

      subAffiliatesData.push({
        name: subAffiliate.name,
        sold: subAffiliateSales.pagination.total,
        status: subAffiliate.status,
      })
    }

    return subAffiliatesData
  } catch (e) {
    console.log(e)
    throw new ResolverError('Failed to get sub affiliates data')
  }
}
