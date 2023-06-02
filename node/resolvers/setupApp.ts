import { setupAppLogic } from '../logic/setupApp'
import type { SetupAppResponse } from '../typings'

export async function setupApp(
  _: unknown,
  __: unknown,
  ctx: Context
): Promise<SetupAppResponse> {
  try {
    const response = await setupAppLogic(ctx)

    return response
  } catch (e) {
    throw e
  }
}
