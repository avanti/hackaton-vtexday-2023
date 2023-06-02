import { ResolverError, NotFoundError } from '@vtex/api'

import type { Affiliate } from '../typings'

export const approveOrDenyAffiliateLogic = async (
  affiliateId: string,
  approve: boolean,
  ctx: Context
): Promise<Affiliate> => {
  const {
    clients: { masterdata },
  } = ctx

  let affiliateSearch: Affiliate[]

  try {
    affiliateSearch = await masterdata.searchDocuments<Affiliate>({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      pagination: {
        page: 1,
        pageSize: 1,
      },
      fields: [
        'affiliateId,affiliateCode,sponsor,name,cpf,email,gender,address,phone,status',
      ],
      where: `affiliateId=${affiliateId}`,
    })
  } catch {
    throw new ResolverError('Failed to get affiliate')
  }

  if (!affiliateSearch.length) {
    throw new NotFoundError(`Affiliate with ID ${affiliateId} not found`)
  }

  const affiliate = affiliateSearch[0]
  const newstatus = approve ? 'APPROVED' : 'DENIED'

  try {
    await masterdata.updatePartialDocument({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      id: affiliate.id as string,
      fields: {
        status: newstatus,
      },
    })
  } catch {
    throw new ResolverError('Failed to update affiliate')
  }

  return {
    ...affiliate,
    status: newstatus,
  }
}
