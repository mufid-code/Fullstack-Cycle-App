import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ThreadEntity } from '../types/thread-dto';
import {
  createRepliesThread,
  createThread,
  deleteThread,
  fetchReplies,
  fetchThreadsByUserId,
  getAllThreads,
  getThreadById,
  mediaById,
  updateThread,
} from '../../api/api-thread';
import {
  CreateThreadDTO,
  threadInputs,
} from '../../features/home/schemas/thread-schemas';
import { useToast } from '@chakra-ui/react';
import { getAllImage } from '../../api/api-uploadimage';

// Toast function
const showToast = (
  toast: ReturnType<typeof useToast>,
  title: string,
  status: 'success' | 'error'
) => {
  toast({
    title,
    status,
    duration: 3000,
    isClosable: true,
  });
};
// Fetch all threads
export const useThreads = () => {
  return useQuery<ThreadEntity[]>({
    queryKey: ['threads'],
    queryFn: getAllThreads,
  });
};
// Fetch all replies
export const useRepliesById = (id: number) => {
  return useQuery<ThreadEntity[]>({
    queryKey: ['replies', id],
    queryFn: () => fetchReplies(id),
    enabled: !!id,
  });
};
// Fetch thread by ID
export const useThreadById = (id: number) => {
  return useQuery<ThreadEntity>({
    queryKey: ['threads', id],
    queryFn: () => getThreadById(id),
    enabled: !!id, // Only fetch if id exists
  });
};
// Fetch all media
export const useMedia = () => {
  return useQuery({
    queryKey: ['media'],
    queryFn: getAllImage,
  });
};

// Create new thread
export const useCreateThread = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (data: CreateThreadDTO) => createThread(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threads'] }); // Refresh thread list after new thread is created
      showToast(toast, 'Thread created successfully', 'success');
    },
  });
};
// Create new thread
export const useCreateRepliesThread = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: threadInputs }) =>
      createRepliesThread(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies'] }); // Refresh thread list after new thread is created
      showToast(toast, 'Thread created successfully', 'success');
    },
  });
};

// Update thread
export const useUpdateThread = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: threadInputs }) =>
      updateThread(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
      showToast(toast, 'Thread updated successfully', 'success');
    },
  });
};

// Delete thread
export const useDeleteThread = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => deleteThread(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
      showToast(toast, 'Thread deleted successfully', 'success');
    },
  });
};

// useMediaById hook to fetch media data by userId
export const useMediaById = (userId: number) => {
  return useQuery({
    queryKey: ['media', userId],
    queryFn: () => mediaById(userId),
    enabled: !!userId, // Only run query if userId is not null or undefined
  });
};

// Custom hook to use threads by user ID
export const useThreadsByUserId = (userId: number) => {
  return useQuery({
    queryKey: ['threads', userId],
    queryFn: () => fetchThreadsByUserId(userId),
    enabled: !!userId, // Ensure userId is truthy before fetching
  });
};
