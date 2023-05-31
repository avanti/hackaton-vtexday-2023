import { getAffiliatesLogic } from '../logic/getAffiliates'
import type { IGetAffiliatesInput } from '../logic/getAffiliates'

export const getAffiliates = async (
  _: unknown,
  { input }: { input: IGetAffiliatesInput },
  ctx: Context
) => {
  try {
    const response = await getAffiliatesLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
