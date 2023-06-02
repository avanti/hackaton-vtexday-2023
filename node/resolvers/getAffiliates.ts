import { getAffiliatesLogic } from '../logic/getAffiliates'
import type { SearchInput, SearchResult, Affiliate } from '../typings'

export const getAffiliates = async (
  _: unknown,
  { input }: { input: SearchInput },
  ctx: Context
): Promise<SearchResult<Affiliate>> => {
  try {
    const response = await getAffiliatesLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
