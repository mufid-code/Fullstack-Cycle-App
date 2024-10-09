import { Box, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import ItemPost from '../../../component/ui/item-post';
import RepliesItemForm from './replies-item-form';
import { useThreadById, useRepliesById } from '../../../app/hooks/use-threads';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks/use-store';

export default function PostPage() {
  const { id } = useParams();
  const user = useAppSelector((state) => state.auth.user);
  const {
    data: threadbyid,
    isLoading: loadingById,
    isError: errorById,
  } = useThreadById(Number(id));
  const {
    data: replies,
    isLoading: loadingReplies,
    isError: errorReplies,
  } = useRepliesById(Number(id));
  console.log(threadbyid); // untuk mengecek data thread
  console.log(replies); // untuk mengecek data replies

  const toast = useToast();

  if (loadingById) {
    return <Spinner />;
  }

  if (errorById || !threadbyid) {
    toast({
      title: 'Error loading thread or replies',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    return <Text>Error loading threads or replies.</Text>;
  }

  return (
    <Box textColor="tweet.putih">
      <Flex
        mt={4}
        padding={4}
        gap={3}
        alignItems="center"
      >
        <Link to="/">
          <Flex gap={3}>
            <HiOutlineArrowLeft size={26} />
            <Text
              fontSize="28px"
              fontWeight={700}
              lineHeight="28px"
            >
              Status
            </Text>
          </Flex>
        </Link>
      </Flex>

      <ItemPost
        key={threadbyid.id}
        username={user.name}
        handle={user.username}
        postTime={new Date(threadbyid.createdAt).toLocaleTimeString()}
        postContent={threadbyid.content}
        postImage={threadbyid.imageUrl}
        likesCount={threadbyid.likes.length}
        repliesCount={threadbyid.replies.length}
        postId={threadbyid.id}
      />

      <RepliesItemForm
        placeholder="Type your reply!"
        buttonTitle="Reply"
      />

      {/* Render replies */}
      {replies?.map((reply) => (
        <ItemPost
          key={reply.id}
          username={reply.User.name}
          handle={reply.User.username}
          avatarUrl={
            reply.User.avatarUrl ||
            'https://static.vecteezy.com/system/resources/previews/043/117/262/non_2x/man-silhouette-profile-picture-anime-style-free-vector.jpg'
          }
          postTime={new Date(reply.createdAt).toLocaleTimeString()}
          postContent={reply.content}
          likesCount={reply.likes.length}
          repliesCount={reply.replies.length}
          postId={reply.id}
        />
      ))}
    </Box>
  );
}
