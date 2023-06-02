import { OrderDetailResponse, CustomApps } from '@vtex/clients'

export const checkCustomData = (order: OrderDetailResponse): string | false => {
  const affiliateSuppliersCustomData = order?.customData?.customApps?.find(
    (app: CustomApps) => app.id === 'affiliates-program'
  )

  if (
    affiliateSuppliersCustomData &&
    affiliateSuppliersCustomData.fields.affiliateCode
  ) {
    return affiliateSuppliersCustomData.fields.affiliateCode
  }

  return false
}
