import type { Affiliate, RecipientsBuilderPayload, Supplier } from '../typings'
import { getAffiliateByCodeLogic } from './getAffiliateByCode'
import { getAffiliateByIdLogic } from './getAffiliateById'
import { checkCustomData } from '../helpers/checkCustomData'

export async function getSuppliersByMiniCart(
  payload: RecipientsBuilderPayload,
  ctx: Context
): Promise<Supplier[]> {
  let order

  try {
    order = await ctx.clients.oms.order(payload.orderId)
  } catch {
    // TODO: decide if we want to throw any error
    return []
  }

  if (!order.customData || !payload.operationValue) {
    return []
  }

  const affiliatesCustomData = checkCustomData(order)

  if (!affiliatesCustomData) {
    return []
  }

  const { code } = affiliatesCustomData.fields

  let affiliate

  try {
    affiliate = await getAffiliateByCodeLogic(code, ctx)
  } catch {
    return []
  }

  const { affiliateId, cpf, name, sponsor } = affiliate

  let affiliateSponsor: Affiliate | undefined

  if (sponsor) {
    try {
      affiliateSponsor = await getAffiliateByIdLogic(sponsor.affiliateId, ctx)
    } catch {
      // TODO: decide if we want to throw any error

      return []
    }
  }

  const affiliateCommision = affiliateSponsor
    ? Math.floor(payload.operationValue * 0.3)
    : Math.floor(payload.operationValue * 0.285)

  const suppliers = [
    {
      id: affiliateId,
      name,
      amount: affiliateCommision,
      document: cpf,
      documentType: 'CPF',
      role: 'affiliate',
      commissionAmount: 0,
      chargebackLiable: false,
      chargeProcesssingFee: false,
    },
  ]

  if (affiliateSponsor) {
    const sponsorCommision = Math.floor(payload.operationValue * 0.015)

    suppliers.push({
      id: affiliateSponsor.affiliateId,
      name: affiliateSponsor.name,
      amount: sponsorCommision,
      document: affiliateSponsor.cpf,
      documentType: 'CPF',
      role: 'affiliate',
      commissionAmount: 0,
      chargebackLiable: false,
      chargeProcesssingFee: false,
    })
  }

  try {
    await ctx.clients.masterdata.createDocument({
      dataEntity: 'affiliateOrders',
      schema: 'affiliateOrders',
      fields: {
        orderId: payload.orderId,
        orderDate: new Date().toISOString(),
        orderTotalValue: payload.operationValue,
        status: 'payment-pending',
        affiliate: suppliers[0],
        sponsor: affiliateSponsor ? suppliers[1] : {},
      },
    })
  } catch {
    // TODO: decide if we want to throw any error
    return []
  }
  return suppliers
}
