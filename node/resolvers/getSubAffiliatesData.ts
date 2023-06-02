import { getSubAffiliatesDataLogic } from '../logic/getSubAffiliatesData'
import type { Affiliate, GetSubAffiliatesDataInput } from '../typings'

export const getSubAffiliatesData = async (
  _: unknown,
  { input }: { input: GetSubAffiliatesDataInput },
  ctx: Context
): Promise<Affiliate> => {
  try {
    const response = await getSubAffiliatesDataLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
