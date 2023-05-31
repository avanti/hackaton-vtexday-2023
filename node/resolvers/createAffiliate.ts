import { createAffiliateLogic } from '../logic/createAffiliate'
import type { ICreateAffiliateInput } from '../logic/createAffiliate'

export const createAffiliate = async (
  _: unknown,
  { input }: { input: ICreateAffiliateInput },
  ctx: Context
) => {
  try {
    const response = await createAffiliateLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
