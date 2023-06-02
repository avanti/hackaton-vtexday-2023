import type { EventContext } from '@vtex/api'

import type { Clients } from '../clients'
import { checkCustomData } from '../helpers/checkCustomData'
import { AffiliateOrder } from '../typings'

export async function orderReceiver(
  ctx: EventContext<Clients>,
  next: () => Promise<any>
): Promise<void> {
  const {
    clients: { masterdata, oms },
    body: { orderId, domain, currentState },
  } = ctx

  const order = await oms.order(orderId)

  const affiliateSuppliersCustomData = checkCustomData(order)

  if (!affiliateSuppliersCustomData) {
    return
  }

  const [affiliateOrder] = await masterdata.searchDocuments<AffiliateOrder>({
    dataEntity: 'affiliateOrders',
    schema: 'affiliateOrders',
    fields: ['id'],
    pagination: {
      page: 1,
      pageSize: 1,
    },
    where: `orderId="${order.orderId}"`,
  })

  if (!affiliateOrder) {
    return
  }

  /* we are checking for domain because the two states we are listening are triggered by the broadcaster twice */
  if (domain === 'Marketplace') {
    await masterdata.updatePartialDocument({
      dataEntity: 'affiliateOrders',
      schema: 'affiliateOrders',
      id: affiliateOrder.id as string,
      fields: {
        status: currentState,
      },
    })
  }

  await next()
}
