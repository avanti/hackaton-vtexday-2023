import { ResolverError } from '@vtex/api'

import affiliateSuppliers from '../../mdv2/affiliateSuppliers.json'
import affiliateSuppliersCodes from '../../mdv2/affiliateSuppliersCodes.json'

export async function setupApp(_: unknown, __: unknown, ctx: Context) {
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
      dataEntity: 'affiliateSuppliersCodes',
      schemaName: 'affiliateSuppliersCodes',
      schemaBody: affiliateSuppliersCodes,
    })
  } catch (e) {
    throw new ResolverError('Failed to setup schemas')
  }

  return {
    success: true,
  }
}
