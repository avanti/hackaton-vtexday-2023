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
  if (!payload.operationValue) {
    return []
  }

  const suppliers: Supplier[] = []

  try {
    const order = await ctx.clients.oms.order(`${payload.orderId}-01`)

    const affiliateCodeFromOrder = checkCustomData(order)

    if (!order.customData || !affiliateCodeFromOrder) {
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

    const affiliateCommision = Math.floor(payload.operationValue * 0.3)

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
      const sponsorCommision = Math.floor(payload.operationValue * 0.5)

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
    return []
  }

  return suppliers
}
