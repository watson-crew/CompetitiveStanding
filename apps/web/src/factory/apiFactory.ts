import { ApiClient } from 'schema';

let globalInstance: ApiClient<unknown>;

export function getApiInstance(): ApiClient<unknown> {
  if (!globalInstance) {
    globalInstance = new ApiClient({
      baseUrl: process.env.API_BASE_URL || 'http://localhost:7071/api',
      baseApiParams: {
        format: 'json',
      },
    });
  }

  return globalInstance;
}
