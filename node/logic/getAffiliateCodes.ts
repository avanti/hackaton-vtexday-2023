import { ResolverError } from '@vtex/api'

export interface IGetAffiliateCodesInput {
  page?: number
  pageSize?: number
  where?: string
}

export const getAffiliateCodesLogic = async (
  input: IGetAffiliateCodesInput,
  ctx: Context
) => {
  const { page, pageSize, where } = input
  const {
    clients: { masterdata },
  } = ctx

  try {
    const response = await masterdata.searchDocumentsWithPaginationInfo({
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
