import { getAffiliateCodesLogic } from '../logic/getAffiliateCodes'
import type { ISearchInput, ISearchResult, IAffiliateCode } from '../typings'

export const getAffiliateCodes = async (
  _: unknown,
  { input }: { input: ISearchInput },
  ctx: Context
): Promise<ISearchResult<IAffiliateCode>> => {
  try {
    const response = await getAffiliateCodesLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
