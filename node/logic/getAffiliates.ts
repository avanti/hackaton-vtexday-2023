import { ResolverError } from '@vtex/api'

import type { IAffiliate, ISearchResult, ISearchInput } from '../typings'

export const getAffiliatesLogic = async (
  input: ISearchInput,
  ctx: Context
): Promise<ISearchResult<IAffiliate>> => {
  const { page, pageSize, where } = input
  const {
    clients: { masterdata },
  } = ctx

  try {
    const response = await masterdata.searchDocumentsWithPaginationInfo<
      IAffiliate
    >({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      pagination: {
        page: page ?? 1,
        pageSize: pageSize ?? 15,
      },
      fields: [
        'affiliateId,sponsor,name,cpf,email,gender,address,phone,status',
      ],
      where: where ?? '',
    })

    return response
  } catch {
    throw new ResolverError('Failed to get affiliates')
  }
}
