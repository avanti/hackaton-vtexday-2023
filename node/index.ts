import type { ParamsContext, RecorderState, ServiceContext } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { createAffiliate } from './resolvers/createAffiliate'
import { getAffiliateById } from './resolvers/getAffiliateById'
import { getAffiliates } from './resolvers/getAffiliates'
import { setupApp } from './resolvers/setupApp'
import { provideSuppliersUsingMiniCart } from './middlewares/suppliers'
import { getAffiliateByCode } from './resolvers/getAffiliateByCode'

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
        getAffiliateByCode,
      },
      Mutation: {
        createAffiliate,
        setupApp,
      },
    },
  },
})
