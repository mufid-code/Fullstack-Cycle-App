import { Avatar, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BiSolidMessageDetail } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import {
  useIsThreadLiked,
  useLikeThread,
  useUnlikeThread,
} from '../../app/hooks/use-like';

interface ItemPostProps {
  username: string;
  handle?: string;
  avatarUrl?: string;
  postTime?: string;
  postContent: string;
  postImage?: string;
  likesCount: number;
  repliesCount: number;
  postId?: Number;
}
export default function ItemPost({
  username,
  handle,
  avatarUrl,
  postId,
  postTime,
  postContent,
  postImage,
  likesCount: initialLikesCount,
  repliesCount,
}: ItemPostProps) {
  const threadId = Number(postId);
  const { data: isLiked } = useIsThreadLiked(threadId);
  const [likesCount, setLikesCount] = useState<number>(initialLikesCount);
  const [isLikedByUser, setIsLikedByUser] = useState<boolean>(isLiked || false);

  const likeMutation = useLikeThread();
  const unlikeMutation = useUnlikeThread();

  // Memperbarui state ketika data `isLiked` berubah
  useEffect(() => {
    if (isLiked !== undefined) {
      setIsLikedByUser(isLiked);
    }
  }, [isLiked]);

  const handleLikeToggle = () => {
    if (isLikedByUser) {
      unlikeMutation.mutate(threadId, {
        onSuccess: () => {
          setLikesCount((prev) => prev - 1); // Kurangi jumlah like
          setIsLikedByUser(false); // Set user tidak menyukai lagi
        },
      });
    } else {
      likeMutation.mutate(threadId, {
        onSuccess: () => {
          setLikesCount((prev) => prev + 1); // Tambah jumlah like
          setIsLikedByUser(true); // Set user menyukai
        },
      });
    }
  };
  return (
    <Flex
      gap="16px"
      py="16px"
      px="20px"
      borderBottom="1px"
      justifyContent="start"
      borderColor="#3F3F3F"
    >
      <Avatar
        borderRadius="full"
        mt="4"
        src={avatarUrl}
        name={username}
        boxSize="40px"
        objectFit="cover"
      />
      <Stack gap="8px">
        <Flex
          gap="4px"
          fontSize="14px"
        >
          <Text
            as="span"
            fontWeight="bold"
          >
            {username}
          </Text>
          <Text
            as="span"
            color="tweet.gray"
          >
            @{handle}
          </Text>
          <Text
            as="span"
            color="tweet.gray"
          >
            •
          </Text>
          <Text
            as="span"
            color="tweet.gray"
          >
            {postTime}
          </Text>
        </Flex>
        <Text
          as="p"
          fontSize="14px"
          lineHeight="20px"
        >
          {postContent}
        </Text>
        <Image
          src={postImage}
          width={'400px'}
          rounded={8}
        />
        <HStack gap="8px">
          <Flex
            fontSize="14px"
            gap="8px"
            alignItems="center"
            onClick={handleLikeToggle}
            style={{ cursor: 'pointer' }}
          >
            <FaHeart color={isLikedByUser ? 'red' : 'gray'} />
            <Text
              as="span"
              color="tweet.gray"
            >
              {likesCount}
            </Text>
          </Flex>
          <Link to={`/detail/${postId}`}>
            <Flex
              fontSize="14px"
              gap="8px"
              alignItems="center"
            >
              <BiSolidMessageDetail />
              <Text
                as="span"
                color="tweet.gray"
              >
                {repliesCount} Replies
              </Text>
            </Flex>
          </Link>
        </HStack>
      </Stack>
    </Flex>
  );
}
