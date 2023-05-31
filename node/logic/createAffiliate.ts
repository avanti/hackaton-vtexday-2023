import { ResolverError } from '@vtex/api'

import type { IAffiliate } from '../typings'
import { generateAffiliateCode } from '../helpers/generateAffiliateCode'

export const createAffiliateLogic = async (
  input: IAffiliate,
  ctx: Context
): Promise<IAffiliate> => {
  const {
    clients: { masterdata /* , acquirer  */ },
  } = ctx
  try {
    // we can use a lib here to improve randomness
    const generatedAffiliateCode = generateAffiliateCode()

    /* await acquirer.createAffiliate(input) */

    const response = await masterdata.createDocument({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      fields: {
        affiliateCode: generatedAffiliateCode,
        status: 'APPROVED',
        ...input,
      },
    })

    return {
      ...input,
    }
  } catch {
    throw new ResolverError('Failed to create affiliate')
  }
}
