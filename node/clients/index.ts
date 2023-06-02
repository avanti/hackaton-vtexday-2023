import { IOClients } from '@vtex/api'
import { OMS, Checkout } from '@vtex/clients'

import { Acquirer } from './acquirer'

export class Clients extends IOClients {
  public get acquirer(): Acquirer {
    return this.getOrSet('acquirer', Acquirer)
  }

  public get oms(): OMS {
    return this.getOrSet('oms', OMS)
  }

  public get checkout(): Checkout {
    return this.getOrSet('checkout', Checkout)
  }
}
