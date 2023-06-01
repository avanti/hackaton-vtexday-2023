import { setupAppLogic } from '../logic/setupApp'

export async function setupApp(
  _: unknown,
  __: unknown,
  ctx: Context
): Promise<{
  success: boolean
}> {
  try {
    const response = await setupAppLogic(ctx)

    return response
  } catch (e) {
    throw e
  }
}
