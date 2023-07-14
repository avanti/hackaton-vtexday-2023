import { ResolverError } from '@vtex/api'
import type { App } from '@vtex/clients'

import affiliateSuppliers from '../../mdv2/affiliateSuppliers.json'
import affiliateOrders from '../../mdv2/affiliateOrders.json'
import type { SetupAppResponse } from '../typings'

export async function setupAppLogic(ctx: Context): Promise<SetupAppResponse> {
  const {
    clients: { masterdata, checkout },
  } = ctx

  let affiliateSuppliersStatus: string
  let affiliateOrdersStatus: string
  let customDataStatus: string

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

  try {
    const currentOrderFormConfiguration = await checkout.getOrderFormConfiguration(
      'ADMIN_TOKEN'
    )

    let newApps: App[] = []

    if (currentOrderFormConfiguration?.apps) {
      newApps = currentOrderFormConfiguration?.apps.slice()

      const previousConfigIndex = newApps?.findIndex(
        (app) => app.id === 'affiliate-program'
      )

      if (previousConfigIndex === -1) {
        newApps?.push({
          id: 'affiliate-program',
          fields: ['affiliateCode'],
          major: 0,
        })
        customDataStatus = 'CREATED'
      } else {
        newApps[previousConfigIndex] = {
          id: 'affiliate-program',
          fields: ['affiliateCode'],
          major: 0,
        }
        customDataStatus = 'UPDATED'
      }
    } else {
      newApps?.push({
        id: 'affiliate-program',
        fields: ['affiliateCode'],
        major: 0,
      })
      customDataStatus = 'CREATED'
    }

    await checkout.setOrderFormConfiguration(
      {
        ...currentOrderFormConfiguration,
        apps: newApps,
      },
      'ADMIN_TOKEN'
    )
  } catch (e) {
    console.log(e)
    customDataStatus = 'FAILED'
  }

  return {
    affiliateSuppliers: {
      status: affiliateSuppliersStatus,
    },
    affiliateOrders: {
      status: affiliateOrdersStatus,
    },
    customData: {
      status: customDataStatus,
    },
  }
}
