import { ExternalClient } from '@vtex/api'
import type { InstanceOptions, IOContext } from '@vtex/api'

/* the interface below, for now, has the same format as this apps schema. however, that probably won't be the case
   and we'll need to change it to fit the acquirer expected payload when creating users there */

interface ICreateAffiliateOnAcquirerBody {
  affiliateId: string
  sponsor: {
    affiliateId: string
    email: string
  }
  name: string
  cpf: string
  email: string
  gender: string
  address: {
    postalCode: string
    street: string
    number: string
    neighborhood: string
    complement: string
    city: string
    state: string
  }
  phone: string
}

export class Acquirer extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://acquirerBaseUrl`, context, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public async createAffiliate(
    body: ICreateAffiliateOnAcquirerBody
  ): Promise<any> {
    return this.http.post('/createAffiliateRoute', body)
  }
}
