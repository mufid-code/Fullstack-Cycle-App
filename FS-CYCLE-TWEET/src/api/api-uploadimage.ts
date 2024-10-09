import { apiV1 } from './api-config';

// Get all threads
export const getAllImage = async () => {
  const response = await apiV1.get('/images');
  return response.data;
};
