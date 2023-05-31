import { json } from 'co-body'

import { getSuppliersByMiniCart } from '../logic/suppliers'

export async function provideSuppliersUsingMiniCart(
  ctx: Context
): Promise<void> {
  const payload = await json(ctx.req)
  const suppliers = getSuppliersByMiniCart(payload, ctx)

  ctx.status = 200
  ctx.body = suppliers
}
