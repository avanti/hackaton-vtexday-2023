import { ResolverError } from '@vtex/api'

export interface ICreateAffiliateInput {
  affiliateId: string
  sponsor: {
    affiliateId: string
    email: string
  }
  name: string
  cpf: string
  email: string
  gender: string
  address: {
    postalCode: string
    street: string
    number: string
    neighborhood: string
    complement: string
    city: string
    state: string
  }
  phone: string
}

export const createAffiliateLogic = async (
  input: ICreateAffiliateInput,
  ctx: Context
) => {
  const {
    clients: { masterdata /* , acquirer  */ },
  } = ctx

  try {
    await masterdata.createDocument({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      fields: {
        ...input,
      },
    })

    /* await acquirer.createAffiliate(input) */

    return {
      ...input,
    }
  } catch {
    throw new ResolverError('Failed to create affiliate')
  }
}
