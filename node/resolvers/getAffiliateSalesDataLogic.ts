import { getAffiliateSalesDataLogic } from '../logic/getAffiliateSalesData'
import type { AffiliateMonthlySalesData } from '../typings'

export const getAffiliateSalesData = async (
  _: unknown,
  { affiliateId }: { affiliateId: string },
  ctx: Context
): Promise<{
  monthlyPerformance: AffiliateMonthlySalesData[]
}> => {
  try {
    const response = await getAffiliateSalesDataLogic(affiliateId, ctx)

    return response
  } catch (e) {
    throw e
  }
}
