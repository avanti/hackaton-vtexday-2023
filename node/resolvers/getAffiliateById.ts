import { getAffiliateByIdLogic } from '../logic/getAffiliateById'
import type { Affiliate } from '../typings'

export const getAffiliateById = async (
  _: unknown,
  { affiliateId }: { affiliateId: string },
  ctx: Context
): Promise<Affiliate> => {
  try {
    const response = await getAffiliateByIdLogic(affiliateId, ctx)

    return response
  } catch (e) {
    throw e
  }
}
