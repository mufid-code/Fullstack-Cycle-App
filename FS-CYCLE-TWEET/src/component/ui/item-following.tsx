import { Button, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
  useFollowUser,
  useIsUserFollowing,
  useUnfollowUser,
} from '../../app/hooks/use-followers';

interface ItemUserProps {
  userId: number; // Tambahkan userId sebagai props
  name: string;
  handle?: string;
  avatar?: string;
}

export default function ItemFollowing({
  userId,
  name,
  handle,
  avatar,
}: ItemUserProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { data: followingStatus } = useIsUserFollowing(userId); // Fetch apakah user mengikuti atau tidak

  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();

  // Set status mengikuti berdasarkan data fetch
  useEffect(() => {
    if (followingStatus) {
      setIsFollowing(followingStatus.isFollowing);
    }
  }, [followingStatus]);

  const handleFollowClick = async () => {
    if (isFollowing) {
      unfollowUser.mutate(userId); // Jika sudah mengikuti, unfollow
    } else {
      followUser.mutate(userId); // Jika belum mengikuti, follow
    }
    setIsFollowing(!isFollowing); // Toggle status follow/unfollow
  };

  return (
    <HStack
      py="8px"
      justifyContent="space-between"
    >
      <Flex
        gap="16px"
        alignItems="center"
      >
        <Image
          borderRadius="full"
          src={avatar}
          boxSize={'40px'}
          alt={name}
        />
        <VStack
          alignItems="start"
          fontSize="14px"
        >
          <Text
            as="span"
            textColor="tweet.putih"
          >
            {name}
          </Text>
          <Text
            as="span"
            textColor="tweet.gray"
          >
            {handle}
          </Text>
        </VStack>
      </Flex>

      <Button
        w={isFollowing ? '100px' : '78px'}
        h="33px"
        rounded="full"
        variant={'outline'}
        fontSize="14px"
        textColor={isFollowing ? 'tweet.gray' : 'tweet.putih'} // Ubah warna teks
        onClick={handleFollowClick} // Tangani klik tombol
      >
        {isFollowing ? 'Following' : 'Follow'} {/* Ubah teks */}
      </Button>
    </HStack>
  );
}
