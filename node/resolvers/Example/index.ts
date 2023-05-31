export async function example(
  _: any,
  _props: any,
  { clients: { example: exampleClient } }: Context,
) {
  const resp: any = await exampleClient.getExample()
  const items = await resp.data.map((data: { item: string }) => data.item)

  return { data: await items }
}
