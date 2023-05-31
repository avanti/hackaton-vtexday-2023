import { getAffiliateByCodeLogic } from '../logic/getAffiliateByCode'
import type { IAffiliate } from '../typings'

export const getAffiliateByCode = async (
  _: unknown,
  { affiliateCode }: { affiliateCode: string },
  ctx: Context
): Promise<IAffiliate> => {
  try {
    const response = await getAffiliateByCodeLogic(affiliateCode, ctx)

    return response
  } catch (e) {
    throw e
  }
}
