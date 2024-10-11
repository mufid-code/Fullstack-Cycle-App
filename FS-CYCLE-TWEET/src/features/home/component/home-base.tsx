import { Box, Spinner, Text, Toast } from '@chakra-ui/react';
import ItemPost from '../../../component/ui/item-post';
import { StatusForm } from './threads/status-form';
import { ThreadEntity } from '../../../app/types/thread-dto';
import { useThreads } from '../../../app/hooks/use-threads';

export function HomeBase() {
  const { data: threads, isLoading, isError } = useThreads();

  if (isLoading) return <Spinner margin="auto" />;

  if (isError || !threads)
    return <Toast status="error">Error loading threads</Toast>;
  console.log(threads);
  return (
    <Box
      h="full"
      className=" text-white py-5 px-5 font-['Plus_Jakarta_Sans']"
    >
      <Text fontSize="28px">Home</Text>
      <StatusForm
        placeholder={'What is happening?!'}
        buttonTitle={'post'}
      />

      {threads?.map((thread: ThreadEntity) => {
        return (
          <ItemPost
            key={thread.id}
            username={thread.User.name}
            handle={thread.User.username}
            avatarUrl={thread.User.avatarUrl}
            postTime={new Date(thread.createdAt).toLocaleTimeString()}
            postContent={thread.content}
            postImage={thread.imageUrl}
            likesCount={thread.likes.length}
            repliesCount={thread.replies.length}
            postId={thread.id}
            authorId={thread.userId}
          />
        );
      })}
    </Box>
  );
}
