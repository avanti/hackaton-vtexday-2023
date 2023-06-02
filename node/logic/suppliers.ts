import type { Affiliate, RecipientsBuilderPayload, Supplier } from '../typings'
import { getAffiliateByCodeLogic } from './getAffiliateByCode'
import { getAffiliateByIdLogic } from './getAffiliateById'
import { checkCustomData } from '../helpers/checkCustomData'

export async function getSuppliersByMiniCart(
  payload: RecipientsBuilderPayload,
  ctx: Context
): Promise<Supplier[]> {
  if (!payload.operationValue) {
    return []
  }

  const suppliers: Supplier[] = []

  try {
    const order = await ctx.clients.oms.order(payload.orderId)

    const affiliatesCustomData = checkCustomData(order)

    if (!order.customData || !affiliatesCustomData) {
      return []
    }

    const affiliate = await getAffiliateByCodeLogic(
      affiliatesCustomData.fields.code,
      ctx
    )

    const { affiliateId, cpf, name, sponsor } = affiliate

    let affiliateSponsor: Affiliate | undefined

    if (sponsor) {
      affiliateSponsor = await getAffiliateByIdLogic(sponsor.affiliateId, ctx)
    }

    const affiliateCommision = affiliateSponsor
      ? Math.floor(payload.operationValue * 0.3) // 30% if has no sponsor
      : Math.floor(payload.operationValue * 0.285) // 28,5% if it has sponsor (95% of 30%)

    suppliers.push({
      id: affiliateId,
      name,
      amount: affiliateCommision,
      document: cpf,
      documentType: 'CPF',
      role: 'affiliate',
      commissionAmount: 0,
      chargebackLiable: false,
      chargeProcesssingFee: false,
    })

    if (affiliateSponsor) {
      const sponsorCommision = Math.floor(payload.operationValue * 0.015) // (5% of 30%)

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
    // TODO: decide if we want to throw any error or just return empty array
    return []
  }

  return suppliers
}
