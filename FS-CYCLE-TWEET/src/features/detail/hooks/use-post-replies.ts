import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  repliesInputs,
  repliesSchema,
} from '../../home/schemas/thread-schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRepliesThread } from '../../../api/api-thread';
import { useToast } from '@chakra-ui/react';

export function usePostReply(threadId: string | undefined) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<repliesInputs>({
    resolver: zodResolver(repliesSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: repliesInputs) =>
      createRepliesThread(Number(threadId), data),
    onSuccess: () => {
      toast({
        title: 'Reply posted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset(); // Reset form setelah sukses
      queryClient.invalidateQueries({ queryKey: ['replies', threadId] }); // Refresh replies setelah posting
    },
    onError: (error: any) => {
      toast({
        title: 'Error posting reply.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: repliesInputs) => {
    mutation.mutate(data); // Mengirim data balasan ke server
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    watch,
  };
}
