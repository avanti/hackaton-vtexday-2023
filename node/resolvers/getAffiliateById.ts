import { getAffiliateByIdLogic } from '../logic/getAffiliateById'
import type { ISearchInput, ISearchResult, IAffiliate } from '../typings'

export const getAffiliateById = async (
  _: unknown,
  { affiliateId }: { affiliateId: string },
  ctx: Context
): Promise<IAffiliate> => {
  try {
    const response = await getAffiliateByIdLogic(affiliateId, ctx)

    return response
  } catch (e) {
    throw e
  }
}
