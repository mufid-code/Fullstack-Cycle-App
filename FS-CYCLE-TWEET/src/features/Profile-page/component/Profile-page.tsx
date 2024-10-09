import { Box, Image, Skeleton, Spinner, Toast } from '@chakra-ui/react';
import { RightBarMyProfile } from '../../../component/ui/right-bar-my-Profile';
import TabsLayout from '../../../component/ui/item-tab-layout';
import ItemPost from '../../../component/ui/item-post';
import { useMedia, useThreads } from '../../../app/hooks/use-threads';
import { ThreadEntity } from '../../../app/types/thread-dto';

export default function MyProfilePage() {
  // Using useParams to get the dynamic ID from the route
  // const media = useAppSelector((state) => state.auth.user.Thread);
  const { data: threads, isLoading, error } = useThreads();
  const {
    data: media,
    isLoading: loadingImages,
    error: imagesError,
  } = useMedia();
  if (isLoading || loadingImages) return <Spinner />;
  console.log();

  if (error || imagesError)
    return <Toast status="error">Error loading threads</Toast>;

  return (
    <Box
      borderX="1px"
      borderColor="#3F3F3F"
      h="full"
      className=" text-white py-5 px-5 font-['Plus_Jakarta_Sans']"
    >
      <RightBarMyProfile />

      <TabsLayout
        title1={'All Post'}
        title2={'Media'}
        tabContent1={
          <>
            {threads?.map((thread: ThreadEntity) => (
              <ItemPost
                key={thread.userId}
                username={thread.User.name}
                handle={thread.User.username}
                avatarUrl={
                  thread.User.avatarUrl ||
                  'https://static.vecteezy.com/system/resources/previews/043/117/262/non_2x/man-silhouette-profile-picture-anime-style-free-vector.jpg'
                }
                postTime={new Date(thread.createdAt).toLocaleTimeString()}
                postContent={thread.content}
                postImage={thread.imageUrl}
                likesCount={thread.likes.length}
                repliesCount={thread.replies.length}
                postId={thread.id}
              />
            ))}
          </>
        }
        tabContent2={
          <>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              w={'full'}
              justifyContent={'center'}
              px={1}
              gap={3}
            >
              {media.map((media: any) => (
                <Skeleton
                  isLoaded={!loadingImages}
                  key={media.id}
                >
                  <Image
                    boxSize="155px"
                    objectFit="cover"
                    src={media.imageUrl}
                    alt={`Image from post ${media.id}`}
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
