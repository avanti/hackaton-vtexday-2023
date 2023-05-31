import { createAffiliateCodeLogic } from '../logic/createAffiliateCode'
import type { ICreateAffiliateCodeInput } from '../logic/createAffiliateCode'

export const createAffiliateCode = async (
  _: unknown,
  { input }: { input: ICreateAffiliateCodeInput },
  ctx: Context
) => {
  try {
    const response = await createAffiliateCodeLogic(input, ctx)

    return response
  } catch (e) {
    throw e
  }
}
