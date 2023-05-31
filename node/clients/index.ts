/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IOClients } from '@vtex/api'
import { OMS } from '@vtex/clients'

import { Acquirer } from './acquirer'

export class Clients extends IOClients {
  public get acquirer() {
    return this.getOrSet('acquirer', Acquirer)
  }

  public get oms() {
    return this.getOrSet('oms', OMS)
  }
}
