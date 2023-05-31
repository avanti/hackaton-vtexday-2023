import { getAffiliatesLogic } from '../logic/getAffiliates'
import type { ISearchInput, ISearchResult, IAffiliate } from '../typings'

export const getAffiliates = async (
  _: unknown,
  { input }: { input: ISearchInput },
  ctx: Context
): Promise<ISearchResult<IAffiliate>> => {
  try {
    const response = await getAffiliatesLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
