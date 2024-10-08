import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addLikeThread,
  isThreadLiked,
  unlikeThread,
} from '../../api/api-likes';

// Like a thread
export const useLikeThread = () => {
  return useMutation({
    mutationFn: (threadId: number) => addLikeThread(threadId),
  });
};

// Unlike a thread
export const useUnlikeThread = () => {
  return useMutation({
    mutationFn: (threadId: number) => unlikeThread(threadId),
  });
};

// Get islike by ID
export const useIsThreadLiked = (threadId: number) => {
  return useQuery({
    queryKey: ['thread', threadId],
    queryFn: () => isThreadLiked(threadId),
  });
};
