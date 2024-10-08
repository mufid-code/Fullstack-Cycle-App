import { useQuery } from '@tanstack/react-query';
import { searchUsers } from '../../api/api-search';

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ['searchUsers', query],
    queryFn: () => searchUsers(query),
    enabled: !!query, // Only fetch if id exists
  });
};
