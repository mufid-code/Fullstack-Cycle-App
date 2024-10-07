import { Spinner } from '@chakra-ui/react';
import ItemFollowing from '../../../component/ui/item-following';
import TabsLayout from '../../../component/ui/item-tab-layout';
import { useParams } from 'react-router-dom';
import { useUsers } from '../../../app/hooks/use-user';
import { useFollowers, useFollowing } from '../../../app/hooks/use-followers';
import { FollowEntity } from '../../../app/types/follow-dto';

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
  const { id } = useParams();
  const userId = Number(id);
  // Fetch followers data
  const { data: users, isLoading } = useUsers();
  const { data: followers } = useFollowers(userId);
  const { data: following } = useFollowing(userId);
  console.log(users);
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
                avatar={users.follower.avatarUrl}
                userId={users.id}
              />
            ))
          )}
        </>
      }
      tabContent2={
        <>
          {isLoading ? (
            <Spinner /> // Loading stateItemPost
          ) : (
            following?.map((users: FollowEntity) => (
              <ItemFollowing
                key={users.id}
                name={users.following.name}
                handle={users.following.username}
                avatar={users.following.avatarUrl}
                userId={users.id}
              />
            ))
          )}
        </>
      }
      userId={userId}
    />
  );
}
