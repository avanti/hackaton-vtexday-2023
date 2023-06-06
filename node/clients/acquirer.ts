import { ExternalClient } from '@vtex/api'
import type { InstanceOptions, IOContext } from '@vtex/api'
import {
  CreateRecipientAtPagarMe,
  CreateRecipientAtPagarMeResponse,
} from '../typings'

export class Acquirer extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://api.pagar.me`, context, {
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
    body: CreateRecipientAtPagarMe
  ): Promise<CreateRecipientAtPagarMeResponse> {
    return this.http.post('/core/v5/recipients', body)
  }
}
