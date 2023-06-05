import type {
  Affiliate,
  RecipientsBuilderPayload,
  Supplier,
  Sponsor,
} from '../typings'
import { getAffiliateByCodeLogic } from './getAffiliateByCode'
import { getAffiliateByIdLogic } from './getAffiliateById'
import { checkCustomData } from '../helpers/checkCustomData'

export async function getSuppliersByMiniCart(
  payload: RecipientsBuilderPayload,
  ctx: Context
): Promise<Supplier[]> {
  ctx.clients.beeceptor.beeceptor(payload)
  if (!payload.operationValue) {
    ctx.clients.beeceptor.beeceptor('Falhou no início')
    return []
  }

  const suppliers: Supplier[] = []

  try {
    const order = await ctx.clients.oms.order(`${payload.orderId}-01`)

    const affiliateCodeFromOrder = checkCustomData(order)

    if (!order.customData || !affiliateCodeFromOrder) {
      ctx.clients.beeceptor.beeceptor('Falhou no customData ou oms')
      return []
    }

    const affiliate = await getAffiliateByCodeLogic(affiliateCodeFromOrder, ctx)

    const { affiliateId, cpf, name, sponsor } = affiliate

    let affiliateSponsor: Affiliate | undefined

    if (sponsor) {
      affiliateSponsor = await getAffiliateByIdLogic(
        (sponsor as Sponsor).affiliateId,
        ctx
      )
    }

    const affiliateCommision = affiliateSponsor
      ? Math.floor(payload.operationValue * 0.3) // 30% if has no sponsor
      : Math.floor(payload.operationValue * 0.285) // 28,5% if it has sponsor (95% of 30%)

    suppliers.push({
      id: affiliateId as string,
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
        id: affiliateSponsor.affiliateId as string,
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
    ctx.clients.beeceptor.beeceptor('Falhou no último catch')
    return []
  }

  return suppliers
}
