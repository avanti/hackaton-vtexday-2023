import { OrderDetailResponse, CustomApps } from '@vtex/clients'

export const checkCustomData = (
  order: OrderDetailResponse
): CustomApps | false => {
  const affiliateSuppliersCustomData = order?.customData?.customApps?.find(
    (app: CustomApps) => app.id === 'affiliates-program'
  )

  if (affiliateSuppliersCustomData) {
    return affiliateSuppliersCustomData
  }

  return false
}
