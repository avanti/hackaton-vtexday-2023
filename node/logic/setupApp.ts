import { ResolverError } from '@vtex/api'

import affiliateSuppliers from '../../mdv2/affiliateSuppliers.json'
import affiliateOrders from '../../mdv2/affiliateOrders.json'

export async function setupAppLogic(
  ctx: Context
): Promise<{
  success: boolean
}> {
  const {
    clients: { masterdata },
  } = ctx

  try {
    await masterdata.createOrUpdateSchema({
      dataEntity: 'affiliateSuppliers',
      schemaName: 'affiliateSuppliers',
      schemaBody: affiliateSuppliers,
    })

    await masterdata.createOrUpdateSchema({
      dataEntity: 'affiliateOrders',
      schemaName: 'affiliateOrders',
      schemaBody: affiliateOrders,
    })
  } catch (e) {
    console.log(e)
    throw new ResolverError('Failed to setup schemas')
  }

  return {
    success: true,
  }
}
