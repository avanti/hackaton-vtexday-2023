import { getAffiliateCodeLogic } from '../logic/getAffiliateCode'
import type { IAffiliateCode } from '../typings'

export const getAffiliateCode = async (
  _: unknown,
  { code }: { code: string },
  ctx: Context
): Promise<IAffiliateCode | null> => {
  try {
    const response = await getAffiliateCodeLogic(code, ctx)

    return response
  } catch (e) {
    throw e
  }
}
