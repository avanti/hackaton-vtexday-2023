import { getAffiliateByCodeLogic } from '../logic/getAffiliateByCode'
import type { Affiliate } from '../typings'

export const getAffiliateByCode = async (
  _: unknown,
  { affiliateCode }: { affiliateCode: string },
  ctx: Context
): Promise<Affiliate> => {
  try {
    const response = await getAffiliateByCodeLogic(affiliateCode, ctx)

    return response
  } catch (e) {
    throw e
  }
}
