import { ResolverError, NotFoundError } from '@vtex/api'

import type { Affiliate } from '../typings'

export const getAffiliateByMailLogic = async (
  affiliateMail: string,
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
      where: `email=${affiliateMail}`,
    })
  } catch {
    throw new ResolverError('Failed to get affiliate')
  }

  if (!affiliateSearch.length) {
    throw new NotFoundError(`Affiliate with email ${affiliateMail} not found`)
  }

  return affiliateSearch[0]
}
