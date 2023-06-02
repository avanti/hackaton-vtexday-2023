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
      where: `affiliateId=${input.affiliateId} OR email=${input.email}`,
    })
  } catch {
    throw new ResolverError('Failed to check affiliates database')
  }

  if (affiliateSearch.length) {
    throw new UserInputError(
      `Affiliate with ID ${input.affiliateId} or email ${input.email} already exists`
    )
  }

  let sponsorFullData: Affiliate | undefined

  if (input.sponsor) {
    const sponsorEmail = input.sponsor as string
    let sponsorSearch: Affiliate[]

    try {
      sponsorSearch = await masterdata.searchDocuments<Affiliate>({
        dataEntity: 'affiliateSuppliers',
        schema: 'affiliateSuppliers',
        fields: ['_all'],
        pagination: {
          page: 1,
          pageSize: 1,
        },
        where: `email=${sponsorEmail}`,
      })
    } catch {
      throw new NotFoundError(`Failed to get sponsor`)
    }

    if (!sponsorSearch.length) {
      throw new NotFoundError(`Sponsor with email ${sponsorEmail} not found`)
    }

    if (sponsorSearch[0].status !== 'APPROVED') {
      throw new NotFoundError(`Sponsor ${sponsorEmail} not approved`)
    }

    sponsorFullData = sponsorSearch[0]
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
        sponsor: sponsorFullData
          ? {
              affiliateId: sponsorFullData.affiliateId,
              email: sponsorFullData.email,
            }
          : null,
        status: 'PENDING',
      },
    })

    return {
      ...input,
      affiliateCode: generatedAffiliateCode,
      sponsor: sponsorFullData
        ? {
            affiliateId: sponsorFullData.affiliateId,
            email: sponsorFullData.email,
          }
        : (null as any),
      status: 'PENDING',
    }
  } catch {
    throw new ResolverError('Failed to create affiliate')
  }
}
