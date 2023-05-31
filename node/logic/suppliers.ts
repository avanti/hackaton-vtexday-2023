import type { IAffiliate, RecipientsBuilderPayload, Supplier } from '../typings'
import { getAffiliateByCodeLogic } from './getAffiliateByCode'
import { getAffiliateByIdLogic } from './getAffiliateById'

interface ICustomApp {
  id: string
  fields: Record<string, unknown>
}

export async function getSuppliersByMiniCart(
  payload: RecipientsBuilderPayload,
  ctx: Context
): Promise<Supplier[]> {
  const order = await ctx.clients.oms.order(payload.orderId)

  if (!order.customData || !payload.operationValue) {
    return []
  }

  const affiliatesCustomData = order.customData.customApps.find(
    (app: ICustomApp) => app.id === 'avanti-vtexio-boilerplate-backend'
  )

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

  let affiliateSponsor: IAffiliate | undefined

  if (sponsor) {
    try {
      affiliateSponsor = await getAffiliateByIdLogic(sponsor.affiliateId, ctx)
    } catch {
      return []
    }
  }

  const affiliateCommision = affiliateSponsor
    ? payload.operationValue * 0.3
    : payload.operationValue * 0.285

  const sponsorCommision = affiliateSponsor ? payload.operationValue * 0.015 : 0

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

  return suppliers
}
