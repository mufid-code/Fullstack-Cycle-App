import { apiV1 } from './api-config';

export const searchUsers = async (query: string) => {
  const response = await apiV1.get(`/search`, {
    params: { query },
  });
  return response.data;
};
