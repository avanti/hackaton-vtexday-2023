import { getAffiliateSalesDataLogic } from '../logic/getAffiliateSalesData'
import type { AffiliateMonthlySalesData } from '../typings'

export const getAffiliateSalesData = async (
  _: unknown,
  { affiliateEmail }: { affiliateEmail: string },
  ctx: Context
): Promise<{
  monthlyPerformance: AffiliateMonthlySalesData[]
}> => {
  try {
    const response = await getAffiliateSalesDataLogic(affiliateEmail, ctx)

    return response
  } catch (e) {
    throw e
  }
}
