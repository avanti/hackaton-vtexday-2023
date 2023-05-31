import { getAffiliateCodesLogic } from '../logic/getAffiliateCodes'
import type { IGetAffiliateCodesInput } from '../logic/getAffiliateCodes'

export const getAffiliateCodes = async (
  _: unknown,
  { input }: { input: IGetAffiliateCodesInput },
  ctx: Context
) => {
  try {
    const response = await getAffiliateCodesLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
