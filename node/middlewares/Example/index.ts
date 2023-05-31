export async function example(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { example: exampleClient },
  } = ctx

  const resp = await exampleClient.getExample()

  if (resp.data.length === 0) {
    console.error(resp.data)
    ctx.status = 418
  } else {
    ctx.status = 200
    ctx.body = resp
  }

  ctx.set('Cache-control', 'no-cache')

  await next()
}
