import { ResolverError } from '@vtex/api'

export interface ICreateAffiliateCodeInput {
  code: string
  affiliateId: string
  expiresAt: string
}

export const createAffiliateCodeLogic = async (
  input: ICreateAffiliateCodeInput,
  ctx: Context
) => {
  const {
    clients: { masterdata },
  } = ctx

  try {
    await masterdata.createDocument({
      dataEntity: 'affiliateSuppliersCodes',
      schema: 'affiliateSuppliersCodes',
      fields: {
        ...input,
      },
    })

    return {
      ...input,
    }
  } catch {
    throw new ResolverError('Failed to create affiliate code')
  }
}
