import { Alert, Card, Heading, Spinner } from '@chakra-ui/react';
import ItemFollowing from './item-following';
import { useThreads } from '../../app/hooks/use-threads';
import { ThreadEntity } from '../../app/types/thread-dto';

// SuggestedForYou Component
export function ItemSuggestedForYou() {
  const { data: threads, isLoading, isError } = useThreads();
  if (isLoading) return <Spinner />;

  if (isError || !threads)
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
      {threads.map((threads: ThreadEntity) => (
        <ItemFollowing
          key={threads.User.id}
          name={threads.User.name}
          handle={threads.User.bio}
          avatar={
            threads.User.avatarUrl ||
            'https://static.vecteezy.com/system/resources/previews/043/117/262/non_2x/man-silhouette-profile-picture-anime-style-free-vector.jpg'
          }
        /> // Kirim data user sebagai props
      ))}
    </Card>
  );
}
