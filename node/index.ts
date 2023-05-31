import type { ParamsContext, RecorderState, ServiceContext } from '@vtex/api'
import { Service } from '@vtex/api'

import { Clients } from './clients'
import { getAffiliates } from './resolvers/getAffiliates'
import { getAffiliateCodes } from './resolvers/getAffiliateCodes'
import { createAffiliate } from './resolvers/createAffiliate'
import { createAffiliateCode } from './resolvers/createAffiliateCode'
import { setupApp } from './resolvers/setupApp'

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
  graphql: {
    resolvers: {
      Query: {
        getAffiliates,
        getAffiliateCodes,
      },
      Mutation: {
        createAffiliate,
        createAffiliateCode,
        setupApp,
      },
    },
  },
})
