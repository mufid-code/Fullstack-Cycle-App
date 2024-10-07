import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { repliesInputs, threadSchema } from '../../home/schemas/thread-schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRepliesThread } from '../../../api/api-thread';
import { useToast } from '@chakra-ui/react';

export function usePostReply(id: any) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<repliesInputs>({
    resolver: zodResolver(threadSchema),
  });

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: repliesInputs }) =>
      createRepliesThread(id, data),
    onSuccess: () => {
      toast({
        title: 'Thread created.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset();
      // Use the defined query key here
      queryClient.invalidateQueries({ queryKey: ['replies'] }); // Invalidate the threads query
    },
    onError: (error) => {
      toast({
        title: 'Error creating thread.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });
  const onSubmit = (data: repliesInputs) => {
    mutation.mutate({ id, data }); // Call the mutate function to create the thread
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
