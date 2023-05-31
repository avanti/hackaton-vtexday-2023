import { createAffiliateCodeLogic } from '../logic/createAffiliateCode'
import type { IAffiliateCode } from '../typings'

export const createAffiliateCode = async (
  _: unknown,
  { input }: { input: IAffiliateCode },
  ctx: Context
): Promise<IAffiliateCode> => {
  try {
    const response = await createAffiliateCodeLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
