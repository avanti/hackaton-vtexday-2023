import { ExternalClient } from '@vtex/api'
import type { InstanceOptions, IOContext } from '@vtex/api'
import {
  CreateRecipientAtPagarMe,
  CreateRecipientAtPagarMeResponse,
} from '../typings'

export class Beeceptor extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://teste-supplier-protocol.free.beeceptor.com`, context, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        'X-Vtex-Use-Https': 'true',
        Authorization: 'Basic c2tfdGVzdF9rWU05ZTVKZjNhVVJsOThROg==',
      },
    })
  }

  public async createRecipient(
    body: any
  ): Promise<CreateRecipientAtPagarMeResponse> {
    return this.http.post('/', body)
  }
}
