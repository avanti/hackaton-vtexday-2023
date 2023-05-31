import { ResolverError, NotFoundError } from '@vtex/api'

import type { IAffiliate } from '../typings'

export const getAffiliateByIdLogic = async (
  affiliateId: string,
  ctx: Context
): Promise<IAffiliate> => {
  const {
    clients: { masterdata },
  } = ctx

  let affiliateSearch: IAffiliate[]

  try {
    affiliateSearch = await masterdata.searchDocuments<IAffiliate>({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      pagination: {
        page: 1,
        pageSize: 1,
      },
      fields: [
        'affiliateId,sponsor,name,cpf,email,gender,address,phone,status',
      ],
      where: `affiliateId=${affiliateId}`,
    })
  } catch {
    throw new ResolverError('Failed to get affiliate')
  }

  if (!affiliateSearch.length) {
    throw new NotFoundError(`Affiliate ${affiliateId} not found`)
  }

  return affiliateSearch[0]
}
