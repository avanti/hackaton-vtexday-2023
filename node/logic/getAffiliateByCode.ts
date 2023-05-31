import { ResolverError, NotFoundError } from '@vtex/api'

import type { IAffiliate } from '../typings'

export const getAffiliateByCodeLogic = async (
  affiliateCode: string,
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
        'affiliateId,affiliateCode,sponsor,name,cpf,email,gender,address,phone,status',
      ],
      where: `affiliateCode=${affiliateCode}`,
    })
  } catch {
    throw new ResolverError(
      `Failed to get affiliate with code ${affiliateCode}`
    )
  }

  if (!affiliateSearch.length) {
    throw new NotFoundError(`Affiliate with code ${affiliateCode} not found`)
  }

  return affiliateSearch[0]
}
