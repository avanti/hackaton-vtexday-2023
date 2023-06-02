import { ResolverError } from '@vtex/api'

import affiliateSuppliers from '../../mdv2/affiliateSuppliers.json'
import affiliateOrders from '../../mdv2/affiliateOrders.json'
import type { SetupAppResponse } from '../typings'

export async function setupAppLogic(ctx: Context): Promise<SetupAppResponse> {
  const {
    clients: { masterdata },
  } = ctx

  let affiliateSuppliersStatus: string
  let affiliateOrdersStatus: string

  try {
    await masterdata.createOrUpdateSchema({
      dataEntity: 'affiliateSuppliers',
      schemaName: 'affiliateSuppliers',
      schemaBody: affiliateSuppliers,
    })

    affiliateSuppliersStatus = 'CREATED/UPDATED'
  } catch (e) {
    if (e.response?.status) {
      affiliateSuppliersStatus = 'NOT MODIFIED'
    } else {
      throw new ResolverError(
        'Failed to create or update affiliateSuppliers schema'
      )
    }
  }

  try {
    await masterdata.createOrUpdateSchema({
      dataEntity: 'affiliateOrders',
      schemaName: 'affiliateOrders',
      schemaBody: affiliateOrders,
    })

    affiliateOrdersStatus = 'CREATED/UPDATED'
  } catch (e) {
    if (e.response?.status) {
      affiliateOrdersStatus = 'NOT MODIFIED'
    } else {
      throw new ResolverError(
        'Failed to create or update affiliateOrders schema'
      )
    }
  }

  return {
    affiliateSuppliers: {
      status: affiliateSuppliersStatus,
    },
    affiliateOrders: {
      status: affiliateOrdersStatus,
    },
  }
}
