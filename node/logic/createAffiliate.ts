import { ResolverError } from '@vtex/api'

import type { IAffiliate } from '../typings'

export const createAffiliateLogic = async (
  input: IAffiliate,
  ctx: Context
): Promise<IAffiliate> => {
  const {
    clients: { masterdata /* , acquirer  */ },
  } = ctx
  try {
    /* await acquirer.createAffiliate(input) */

    await masterdata.createDocument({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      fields: {
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
