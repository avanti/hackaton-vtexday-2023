import { IOClients } from '@vtex/api'

import { Acquirer } from './acquirer'

export class Clients extends IOClients {
  public get acquirer() {
    return this.getOrSet('acquirer', Acquirer)
  }
}
