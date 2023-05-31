import { createAffiliateLogic } from '../logic/createAffiliate'
import type { IAffiliate } from '../typings'

export const createAffiliate = async (
  _: unknown,
  { input }: { input: IAffiliate },
  ctx: Context
): Promise<IAffiliate> => {
  try {
    const response = await createAffiliateLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
