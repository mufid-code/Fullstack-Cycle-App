import { Box, Image, Skeleton, Spinner, useToast } from '@chakra-ui/react';
import TabsLayout from '../../../component/ui/item-tab-layout';
import ItemPost from '../../../component/ui/item-post';
import {
  useMediaById,
  useThreadsByUserId,
} from '../../../app/hooks/use-threads'; // Import the new hook
import { useParams } from 'react-router-dom';
import { RightBaProfileOther } from '../../../component/ui/right-bar-profile-other';
import { ThreadEntity } from '../../../app/types/thread-dto';

export default function ProfileOtherPage() {
  const { id } = useParams(); // Get userId from params
  const toast = useToast();

  // Fetch threads by userId
  const {
    data: threads,
    isLoading: loadingThreads,
    error: threadError,
  } = useThreadsByUserId(Number(id));

  // Fetch media by userId
  const {
    data: media,
    isLoading: loadingImages,
    error: mediaError,
  } = useMediaById(Number(id));

  // Show loading spinner while fetching
  if (loadingThreads || loadingImages) {
    return <Spinner />;
  }

  // Show error toast if there's an issue fetching data
  if (threadError || mediaError) {
    toast({
      title: 'Error loading data',
      description: threadError?.message || mediaError?.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return null;
  }

  return (
    <Box
      borderX="1px"
      borderColor="#3F3F3F"
      h="full"
      className="text-white py-5 px-5 font-['Plus_Jakarta_Sans']"
    >
      {/* Profile Info */}
      <RightBaProfileOther
        id={Number(id)}
        userId={Number(id)}
      />

      {/* Tabs for All Post and Media */}
      <TabsLayout
        title1="All Post"
        title2="Media"
        tabContent1={
          <>
            {/* Render threads */}
            {threads?.map((thread: ThreadEntity) => (
              <ItemPost
                key={thread.id}
                username={thread.User?.name || ''}
                handle={thread.User?.username}
                avatarUrl={
                  thread.User?.avatarUrl ||
                  'https://static.vecteezy.com/system/resources/previews/043/117/262/non_2x/man-silhouette-profile-picture-anime-style-free-vector.jpg'
                }
                postTime={new Date(
                  thread?.createdAt || ''
                ).toLocaleTimeString()}
                postContent={thread?.content || ''}
                postImage={thread?.imageUrl}
                likesCount={thread?.likes.length || 0}
                repliesCount={thread?.replies.length || 0}
                postId={thread?.id}
                authorId={thread.userId}
              />
            ))}
          </>
        }
        tabContent2={
          <>
            {/* Render media */}
            <Box
              display="flex"
              flexWrap="wrap"
              w="full"
              justifyContent="center"
              px={1}
              gap={3}
            >
              {media?.map((mediaItem: any) => (
                <Skeleton
                  isLoaded={!loadingImages}
                  key={mediaItem.id}
                >
                  <Image
                    boxSize="155px"
                    objectFit="cover"
                    src={mediaItem.imageUrl}
                    alt={`Image from post ${mediaItem.id}`}
                  />
                </Skeleton>
              ))}
            </Box>
          </>
        }
      />
    </Box>
  );
}
