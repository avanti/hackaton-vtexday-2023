import { ResolverError } from '@vtex/api'

import type { IAffiliateCode } from '../typings'

export const getAffiliateCodeLogic = async (
  code: string,
  ctx: Context
): Promise<IAffiliateCode | null> => {
  const {
    clients: { masterdata },
  } = ctx

  let codesSearch: IAffiliateCode[]

  try {
    codesSearch = await masterdata.searchDocuments<IAffiliateCode>({
      dataEntity: 'affiliateSuppliersCodes',
      schema: 'affiliateSuppliersCodes',
      pagination: {
        page: 1,
        pageSize: 1,
      },
      fields: ['code,affiliateId,expiresAt'],
      where: `code=${code}`,
    })
  } catch {
    throw new ResolverError('Failed to get affiliate')
  }

  if (!codesSearch.length) {
    return null
  }

  return codesSearch[0]
}
