// src/components/PageSearch.tsx
import { Box, Spinner, Text } from '@chakra-ui/react';

import { useState } from 'react';
import SearchBar from './search-bar';

import { UserEntity } from '../../app/types/auth-dto';
import { useSearch } from '../../app/hooks/use-search';
import ItemFollowing from '../../component/ui/item-following';

export default function PageSearch() {
  const [querry, setSearchTerm] = useState('');

  // const { data } = useQuery<UserEntity[]>({
  //   queryKey: ['searchUsers', searchTerm],
  //   queryFn: () => searchUsers(searchTerm),
  //   enabled: searchTerm.length > 0, // Hanya fetch data jika ada input
  // });
  const { data, isLoading } = useSearch(querry);

  return (
    <Box
      textAlign={'center'}
      padding={4}
    >
      <SearchBar onSearch={(value) => setSearchTerm(value)} />
      {!querry && (
        <Box
          m={'auto'}
          textAlign={'center'}
          w={'348px'}
          padding={4}
        >
          <Text
            textColor={'tweet.putih'}
            fontSize={'20px'}
            fontWeight={700}
            lineHeight={'28px'}
          >
            Write and search something
          </Text>
          <Text
            fontSize={'14px'}
            fontWeight={400}
            lineHeight={'20px'}
            color={'tweet.gray'}
          >
            Try searching for something else or check the spelling of what you
            typed.
          </Text>
        </Box>
      )}

      {data?.length === 0 && (
        <Text
          fontSize={'14px'}
          fontWeight={400}
          lineHeight={'20px'}
          color={'tweet.gray'}
        >
          No users found
        </Text>
      )}

      {data && data.length > 0 && (
        <Box mt={4}>
          <>
            {isLoading ? (
              <Spinner /> // Loading state
            ) : (
              data?.map((users: UserEntity) => (
                <ItemFollowing
                  key={users.id}
                  name={users.name}
                  handle={users.username}
                  avatar={
                    users.avatarUrl ||
                    'https://static.vecteezy.com/system/resources/previews/043/117/262/non_2x/man-silhouette-profile-picture-anime-style-free-vector.jpg'
                  }
                  userId={users.id}
                />
              ))
            )}
          </>
        </Box>
      )}
    </Box>
  );
}
