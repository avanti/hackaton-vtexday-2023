import { ResolverError } from '@vtex/api'

import affiliateSuppliers from '../../mdv2/affiliateSuppliers.json'

export async function setupApp(
  _: unknown,
  __: unknown,
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
  } catch (e) {
    console.log(e)
    throw new ResolverError('Failed to setup schemas')
  }

  return {
    success: true,
  }
}
