import { getAffiliateByMailLogic } from '../logic/getAffiliateByMail'
import type { Affiliate } from '../typings'

export const getAffiliateByMail= async (
  _: unknown,
  { affiliateMail }: { affiliateMail: string },
  ctx: Context
): Promise<Affiliate> => {
  try {
    const response = await getAffiliateByMailLogic(affiliateMail, ctx)

    return response
  } catch (e) {
    throw e
  }
}
