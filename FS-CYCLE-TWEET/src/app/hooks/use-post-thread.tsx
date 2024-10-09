import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@chakra-ui/react';
import {
  threadInputs,
  threadSchema,
} from '../../features/home/schemas/thread-schemas';
import { createThread } from '../../api/api-thread';
import { useNavigate } from 'react-router-dom';

export function usePostThread() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<threadInputs>({
    resolver: zodResolver(threadSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: threadInputs) => createThread(data),
    onSuccess: () => {
      toast({
        title: 'Post created.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset(); // Reset form setelah sukses
      queryClient.invalidateQueries({ queryKey: ['threads'] }); // Refresh thread setelah posting
      navigate('/');
    },
    onError: (error: any) => {
      toast({
        title: 'Error creating post.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: threadInputs) => mutation.mutate(data);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    watch,
  };
}
