import { ResolverError } from '@vtex/api'

import type { IAffiliateCode, ISearchResult, ISearchInput } from '../typings'

export const getAffiliateCodesLogic = async (
  input: ISearchInput,
  ctx: Context
): Promise<ISearchResult<IAffiliateCode>> => {
  const { page, pageSize, where } = input
  const {
    clients: { masterdata },
  } = ctx

  try {
    const response = await masterdata.searchDocumentsWithPaginationInfo<
      IAffiliateCode
    >({
      dataEntity: 'affiliateSuppliersCodes',
      schema: 'affiliateSuppliersCodes',
      pagination: {
        page: page ?? 1,
        pageSize: pageSize ?? 15,
      },
      fields: ['code,affiliateId,expiresAt'],
      where: where ?? '',
    })

    return response
  } catch {
    throw new ResolverError('Failed to get affiliate codes')
  }
}
