import { ResolverError } from '@vtex/api'

export interface IGetAffiliatesInput {
  page?: number
  pageSize?: number
  where?: string
}

export const getAffiliatesLogic = async (
  input: IGetAffiliatesInput,
  ctx: Context
) => {
  const { page, pageSize, where } = input
  const {
    clients: { masterdata },
  } = ctx

  try {
    const response = await masterdata.searchDocumentsWithPaginationInfo({
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
