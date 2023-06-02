import { getAffiliateOrdersLogic } from '../logic/getAffiliateOrders'
import type {
  GetAffiliateOrdersInput,
  SearchResult,
  AffiliateOrder,
} from '../typings'

export const getAffiliateOrders = async (
  _: unknown,
  { input }: { input: GetAffiliateOrdersInput },
  ctx: Context
): Promise<SearchResult<AffiliateOrder>> => {
  try {
    const response = await getAffiliateOrdersLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
