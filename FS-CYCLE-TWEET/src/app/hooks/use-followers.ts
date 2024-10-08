import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  isFollowing,
} from '../../api/api-follower';
import { useToast } from '@chakra-ui/react';
import { apiV1 } from '../../api/api-config';

// Hook untuk Follow User
export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (followingId: number) => followUser(followingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      toast({
        title: 'User followed.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },

    onError: (error) => {
      console.log('Error following user:', error); // Log error
      toast({
        title: 'Error following user.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });
};

// Hook untuk Unfollow User
export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (followingId: number) => unfollowUser(followingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      toast({
        title: 'User unfollowed.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.log('Error unfollowing user:', error); // Log error
      toast({
        title: 'Error unfollowing user.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });
};

// Fetch Followers
export const useFollowers = (userId: number) => {
  return useQuery({
    queryKey: ['followers', userId],
    queryFn: () => getFollowers(userId),
    enabled: !!userId,
  });
};

// Fetch Following
export const useFollowing = (userId: number) => {
  return useQuery({
    queryKey: ['following', userId],
    queryFn: () => getFollowing(userId),
    enabled: !!userId,
  });
};
// Fetch Following
export const useIsUserFollowing = (followingId: number) => {
  return useQuery({
    queryKey: ['isFollowing', followingId],
    queryFn: () => isFollowing(followingId),
  });
};
