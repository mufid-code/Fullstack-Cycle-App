import { Box, Flex, Spinner, Text, Toast } from '@chakra-ui/react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import ItemPost from '../../../component/ui/item-post';
import RepliesItemForm from './replies-item-form';
import { useThreadById, useThreads } from '../../../app/hooks/use-threads';
import { Link, useParams } from 'react-router-dom';
import { useUserById } from '../../../app/hooks/use-user';

export default function PostPage() {
  const { id } = useParams();
  const threadid = Number(id);
  const { data } = useUserById(threadid);
  const { data: threadbyid } = useThreadById(threadid);

  const { data: threads, isLoading, isError } = useThreads();
  if (isLoading) return <Spinner />;

  if (isError || !threads)
    return <Toast status="error">Error loading threads</Toast>;

  return (
    <Box>
      <Flex
        mt={4}
        padding={4}
        gap={3}
        alignItems={'center'}
      >
        <HiOutlineArrowLeft size={26} />
        <Link to={'/'}>
          <Text
            fontSize={'28px'}
            fontWeight={700}
            lineHeight={'28px'}
          >
            Status
          </Text>
        </Link>
      </Flex>
      <ItemPost
        key={Number(id)}
        username={data?.name || ''}
        postTime={new Date().toLocaleTimeString()}
        postContent={threadbyid?.content || ''}
        postImage={threadbyid?.imageUrl}
        likesCount={threadbyid?.likes.length || 0}
        repliesCount={threadbyid?.replies.length || 0}
        postId={Number(id)}
      />
      <RepliesItemForm
        placeholder="Type your reply!"
        buttonTitle="Reply"
      />
      {/* {threads?.map((thread: ThreadEntity) => (
        <ItemPost
          key={thread.id}
          username={thread.User.name}
          handle={thread.User.username}
          avatarUrl={
            thread.User.avatarUrl ||
            'https://static.vecteezy.com/system/resources/previews/043/117/262/non_2x/man-silhouette-profile-picture-anime-style-free-vector.jpg'
          }
          postTime={new Date(thread.createdAt).toLocaleTimeString()}
          postContent={thread.content}
          likesCount={thread.likes.length}
          repliesCount={thread.replies.length}
        />
      ))} */}
    </Box>
  );
}
