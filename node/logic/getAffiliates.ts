import { ResolverError } from '@vtex/api'

import type { Affiliate, SearchResult, SearchInput } from '../typings'

export const getAffiliatesLogic = async (
  input: SearchInput,
  ctx: Context
): Promise<SearchResult<Affiliate>> => {
  const { page, pageSize, where } = input
  const {
    clients: { masterdata },
  } = ctx

  try {
    const response = await masterdata.searchDocumentsWithPaginationInfo<
      Affiliate
    >({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      pagination: {
        page: page ?? 1,
        pageSize: pageSize ?? 15,
      },
      fields: [
        'affiliateId,affiliateCode,sponsor,name,cpf,email,gender,address,phone,status,createdIn',
      ],
      where: where ?? '',
    })

    return response
  } catch {
    throw new ResolverError('Failed to get affiliates')
  }
}
