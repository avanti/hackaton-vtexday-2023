import { ResolverError } from '@vtex/api'

import type { IAffiliateCode } from '../typings'

export const createAffiliateCodeLogic = async (
  input: IAffiliateCode,
  ctx: Context
): Promise<IAffiliateCode> => {
  const {
    clients: { masterdata },
  } = ctx

  try {
    await masterdata.createDocument({
      dataEntity: 'affiliateSuppliersCodes',
      schema: 'affiliateSuppliersCodes',
      fields: {
        ...input,
      },
    })

    return {
      ...input,
    }
  } catch {
    throw new ResolverError('Failed to create affiliate code')
  }
}
