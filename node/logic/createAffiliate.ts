import { NotFoundError, ResolverError, UserInputError } from '@vtex/api'

import type { Affiliate } from '../typings'
import { generateAffiliateCode } from '../helpers/generateAffiliateCode'
import { getAffiliateByIdLogic } from '../logic/getAffiliateById'

export const createAffiliateLogic = async (
  input: Affiliate,
  ctx: Context
): Promise<Affiliate> => {
  const {
    clients: { masterdata /* , acquirer  */ },
  } = ctx
  let affiliateSearch: Affiliate[]

  try {
    affiliateSearch = await masterdata.searchDocuments<Affiliate>({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      pagination: {
        page: 1,
        pageSize: 1,
      },
      fields: ['id'],
      where: `affiliateId=${input.affiliateId}`,
    })
  } catch {
    throw new ResolverError('Failed to check affiliates database')
  }

  if (affiliateSearch.length) {
    throw new UserInputError(
      `Affiliate with ID ${input.affiliateId} already exists`
    )
  }

  if (input.sponsor) {
    const { affiliateId } = input.sponsor
    let sponsorFullData: Affiliate

    try {
      sponsorFullData = await getAffiliateByIdLogic(affiliateId, ctx)
    } catch {
      throw new NotFoundError(`Sponsor ${affiliateId} not found`)
    }

    if (sponsorFullData.status !== 'APPROVED') {
      throw new NotFoundError(`Sponsor ${affiliateId} not approved`)
    }
  }

  /* here we will create the affiliate at the acquirer
       we are doing it before saving in MD in case we need any infomartion returned by them

      await acquirer.createAffiliate(input) 
    */

  // we can use a lib here to improve randomness
  const generatedAffiliateCode = generateAffiliateCode()

  try {
    await masterdata.createDocument({
      dataEntity: 'affiliateSuppliers',
      schema: 'affiliateSuppliers',
      fields: {
        ...input,
        affiliateCode: generatedAffiliateCode,
        status: 'PENDING',
      },
    })

    return {
      affiliateCode: generatedAffiliateCode,
      ...input,
    }
  } catch {
    throw new ResolverError('Failed to create affiliate')
  }
}
