import { Flex, Box, Image, Spinner, useToast, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiXCircle } from 'react-icons/hi';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import ItemPost from '../../../component/ui/item-post';
import RepliesItemForm from './replies-item-form';
import { useAppSelector } from '../../../app/hooks/use-store';
import { useRepliesById, useThreadById } from '../../../app/hooks/use-threads';
import { useState } from 'react';

export default function DetailImagePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useAppSelector((state) => state.auth.user);
  const [isContentOpen, setIsContentOpen] = useState(true);
  const {
    data: threadbyid,
    isLoading: loadingById,
    isError: errorById,
  } = useThreadById(Number(id));
  const { data: replies } = useRepliesById(Number(id));
  console.log(threadbyid); // untuk mengecek data thread
  console.log(replies); // untuk mengecek data replies

  const toast = useToast();

  if (loadingById) {
    return <Spinner />;
  }
  const fullImage = () => {
    setIsContentOpen(false);
  };

  const openContent = () => {
    setIsContentOpen(true);
  };
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
    <Flex
      justifyContent={'space-between'}
      p={2}
    >
      <Box
        flex={'1'}
        position={'sticky'}
        top={0}
        px={2}
        height={'100vh'}
      >
        <Box
          position={'absolute'}
          top={4}
          left={2}
        >
          <HiXCircle
            size={34}
            onClick={() => navigate(-1)}
            cursor={'pointer'}
          />
        </Box>
        <Box
          onClick={isContentOpen ? fullImage : openContent}
          cursor={'pointer'}
          rounded={'full'}
          border={'solid 2px'}
          borderColor={'white'}
          position={'absolute'}
          top={4}
          right={2}
        >
          {isContentOpen ? (
            <HiChevronRight size={24} />
          ) : (
            <HiChevronLeft size={24} />
          )}
        </Box>
        <Image
          src={threadbyid.imageUrl}
          height={'100%'}
          width={'100%'}
          rounded={4}
          objectFit="contain"
        />
      </Box>
      {isContentOpen && (
        <Box
          width={'30%'}
          id="imageCard"
          borderLeft={'solid 1px'}
        >
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
            authorId={threadbyid.userId}
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
              authorId={reply.userId}
            />
          ))}
        </Box>
      )}
    </Flex>
  );
}
