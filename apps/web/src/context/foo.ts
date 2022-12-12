import { ApiClient } from 'schema';
import { setupCache } from 'axios-cache-adapter';

let globalInstance: ApiClient<unknown>;

/**
 * Only to be used in places where useContext is not allowed.
 * @returns
 */
export function getApiInstance(): ApiClient<unknown> {
  if (!globalInstance) {
    const cache = setupCache({
      maxAge: 15 * 60 * 1000,
    });

    globalInstance = new ApiClient({
      baseURL: process.env.API_BASE_URL || 'http://localhost:7071/api',
      adapter: cache.adapter,
    });
  }

  return globalInstance;
}
