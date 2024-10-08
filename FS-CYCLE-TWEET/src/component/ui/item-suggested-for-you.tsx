import { Alert, Card, Heading, Spinner } from '@chakra-ui/react';
import ItemFollowing from './item-following';
import { useUsers } from '../../app/hooks/use-user';
import { UserEntity } from '../../app/types/auth-dto';

// SuggestedForYou Component
export function ItemSuggestedForYou() {
  const { data: users, isLoading, isError } = useUsers();
  if (isLoading) return <Spinner />;

  if (isError || !users)
    return <Alert status="error">Error loading threads</Alert>;
  return (
    <Card
      bgColor="tweet.profiles"
      textColor="tweet.putih"
      px="24px"
      py="8px"
    >
      <Heading
        fontSize="20px"
        fontWeight="bold"
        py="8px"
      >
        Suggested for you
      </Heading>
      {users.slice(0, 5).map((user: UserEntity) => (
        <ItemFollowing
          key={user.id}
          userId={user.id} // Kirimkan userId sebagai props
          name={user.name}
          handle={user.bio}
          avatar={
            user.avatarUrl ||
            'https://static.vecteezy.com/system/resources/previews/043/117/262/non_2x/man-silhouette-profile-picture-anime-style-free-vector.jpg'
          }
        /> // Kirim data user sebagai props
      ))}
    </Card>
  );
}
