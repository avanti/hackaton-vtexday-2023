import { approveOrDenyAffiliateLogic } from '../logic/approveOrDenyAffiliate'
import type { Affiliate, ApproveOrDenyAffiliateInput } from '../typings'

export const approveOrDenyAffiliate = async (
  _: unknown,
  { input }: { input: ApproveOrDenyAffiliateInput },
  ctx: Context
): Promise<Affiliate> => {
  const { affiliateId, approve } = input
  try {
    const response = await approveOrDenyAffiliateLogic(
      affiliateId,
      approve,
      ctx
    )

    return response
  } catch (e) {
    throw e
  }
}
