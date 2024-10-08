import { Spinner } from '@chakra-ui/react';
import ItemFollowing from '../../../component/ui/item-following';
import TabsLayout from '../../../component/ui/item-tab-layout';
import { useParams } from 'react-router-dom';
import { useUsers } from '../../../app/hooks/use-user';
import { useFollowers, useFollowing } from '../../../app/hooks/use-followers';
import { FollowEntity } from '../../../app/types/follow-dto';
import { useAppSelector } from '../../../app/hooks/use-store';

// const followers = [
//   {
//     username: "Lina Kusuma",
//     handle: "linakus",
//     avatarUrl: "https://bit.ly/ryan-florence",
//     postTime: "2h",
//     postContent:
//       "Ada yang tahu rekomendasi framework terbaik untuk proyek e-commerce?",
//     likesCount: 75,
//     repliesCount: 29,
//   },
// ];
// const following = [
//   {
//     username: "Indah Pra Karya",
//     handle: "indahpra",
//     avatarUrl: "https://bit.ly/dan-abramov",
//     postTime: "4h",
//     postContent:
//       "Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya kita ga survive sampe tanggal tertentu.",
//     likesCount: 36,
//     repliesCount: 381,
//   },
// ];
export default function FollowsTabs() {
  const userId = useAppSelector((state) => state.auth.user.id);
  const { data: followers, isLoading } = useFollowers(userId);
  const { data: following, isLoading: loadingFollowing } = useFollowing(userId);
  return (
    <TabsLayout
      title1={'Followers'}
      title2={'Following'}
      tabContent1={
        <>
          {isLoading ? (
            <Spinner /> // Loading state
          ) : (
            followers?.map((users: FollowEntity) => (
              <ItemFollowing
                key={users.id}
                name={users.follower.name}
                handle={users.follower.username}
                avatar={
                  users.follower.avatarUrl ||
                  'https://static.vecteezy.com/system/resources/previews/043/117/262/non_2x/man-silhouette-profile-picture-anime-style-free-vector.jpg'
                }
                followingId={users.id}
              />
            ))
          )}
        </>
      }
      tabContent2={
        <>
          {loadingFollowing ? (
            <Spinner /> // Loading stateItemPost
          ) : (
            following?.map((users: FollowEntity) => (
              <ItemFollowing
                key={users.id}
                name={users.following.name}
                handle={users.following.username}
                avatar={
                  users.following.avatarUrl ||
                  'https://static.vecteezy.com/system/resources/previews/043/117/262/non_2x/man-silhouette-profile-picture-anime-style-free-vector.jpg'
                }
                followingId={users.id}
              />
            ))
          )}
        </>
      }
    />
  );
}
