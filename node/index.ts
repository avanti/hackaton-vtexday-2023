import type { ParamsContext, RecorderState, ServiceContext } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { createAffiliate } from './resolvers/createAffiliate'
import { approveOrDenyAffiliate } from './resolvers/approveOrDenyAffiliate'
import { getAffiliateById } from './resolvers/getAffiliateById'
import { getAffiliates } from './resolvers/getAffiliates'
import { setupApp } from './resolvers/setupApp'
import { getAffiliateByCode } from './resolvers/getAffiliateByCode'
import { getAffiliateOrders } from './resolvers/getAffiliateOrders'
import { getSubAffiliatesData } from './resolvers/getSubAffiliatesData'
import { getAffiliateByMail } from './resolvers/getAffiliateByMail'
import { getAffiliateSalesData } from './resolvers/getAffiliateSalesDataLogic'
import { orderReceiver } from './middlewares/orderReceiver'
import { provideSuppliersUsingMiniCart } from './middlewares/suppliers'

const MEDIUM_TIMEOUT_MS = 2 * 1000

declare global {
  type Context = ServiceContext<Clients>
}

export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        timeout: MEDIUM_TIMEOUT_MS,
      },
    },
  },
  events: {
    orderReceiver,
  },
  /* routes: {
    getSuppliersByMiniCart: method({
      POST: [provideSuppliersUsingMiniCart],
    }),
  }, */
  graphql: {
    resolvers: {
      Query: {
        getAffiliates,
        getAffiliateById,
        getAffiliateByMail,
        getAffiliateByCode,
        getAffiliateOrders,
        getSubAffiliatesData,
        getAffiliateSalesData,
      },
      Mutation: {
        createAffiliate,
        approveOrDenyAffiliate,
        setupApp,
      },
    },
  },
})
