import { createAffiliateLogic } from '../logic/createAffiliate'
import type { Affiliate } from '../typings'

export const createAffiliate = async (
  _: unknown,
  { input }: { input: Affiliate },
  ctx: Context
): Promise<Affiliate> => {
  try {
    const response = await createAffiliateLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
