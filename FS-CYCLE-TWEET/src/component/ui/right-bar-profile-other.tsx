import {
  Card,
  Heading,
  Stack,
  Flex,
  Image,
  Text,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { IoArrowBack } from 'react-icons/io5';
import { useUserById } from '../../app/hooks/use-user';
import { useEffect, useState } from 'react';
import {
  useFollowUser,
  useIsUserFollowing,
  useUnfollowUser,
} from '../../app/hooks/use-followers';
import { useNavigate } from 'react-router-dom';

// RightBarMyProfile Component
export function RightBaProfileOther({
  id,
  userId,
}: {
  id: number;
  userId: number;
}) {
  const { data } = useUserById(id);
  const [isFollowing, setIsFollowing] = useState(false);
  const { data: followingStatus } = useIsUserFollowing(userId); // Fetch apakah user mengikuti atau tidak
  const navigate = useNavigate();
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
    <>
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
          <Flex
            alignItems={'center'}
            gap={2}
          >
            <IoArrowBack
              size={24}
              onClick={() => navigate(-1)}
              cursor={'pointer'}
            />
            {data?.name}
          </Flex>
        </Heading>
        <Stack gap="12px">
          <Image
            src={
              data?.avatarUrl ||
              'https://res.cloudinary.com/dje40bx3b/image/upload/v1728323518/circle-image/vdlx9stb6q2vb1syhpb9.png'
            }
            position="relative"
            borderRadius="12px"
            h="100px"
            backgroundSize="cover"
          />
          <Avatar
            src={data?.avatarUrl}
            name={data?.name}
            position="absolute"
            mt="70px"
            ml="24px"
            borderRadius="full"
            border="2px"
            zIndex="8"
            boxSize="80px"
            backgroundSize="cover"
          />
          <Flex
            justifyContent="end"
            alignSelf="stretch"
          >
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
            {/* <Button
              w="106px"
              variant="outline"
              onClick={onOpen}
            >
              <Text
                as={'span'}
                fontSize="14px"
                textColor="tweet.putih"
              >
                Edit Profile
              </Text>
            </Button> */}
          </Flex>
          <Stack gap="4px">
            <Text
              as={'span'}
              fontSize="24px"
            >
              {data?.name}
            </Text>
            <Text
              as={'span'}
              fontSize="14px"
              textColor="tweet.gray"
            >
              @{data?.username}
            </Text>
            <Text
              as={'span'}
              fontSize="16px"
            >
              {data?.bio}
            </Text>
            <Flex
              gap="4px"
              fontSize="16px"
            >
              <Text as={'span'}>{0}</Text>
              <Text
                as={'span'}
                textColor="tweet.gray"
              >
                Followers
              </Text>
              <Text
                ml="12px"
                as={'span'}
              >
                {0}
              </Text>
              <Text
                as={'span'}
                textColor="tweet.gray"
              >
                Following
              </Text>
            </Flex>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
