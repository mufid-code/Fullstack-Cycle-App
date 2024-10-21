import { Button, FormControl, Input, Stack, Toast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { sendPasswordResetEmail } from '../../../../api/api-auth';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: sendPasswordResetEmail,
    onSuccess: () =>
      Toast({
        title: 'forget Password.',
        description: 'Email sent!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      }),
    onError: () =>
      Toast({
        title: 'forget Password.',
        description: 'Failed to send email.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      }),
  });

  const onSubmit = (data: ForgotPasswordInputs) => {
    mutation.mutate(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.email}>
        <Stack spacing={'12px'}>
          <Input
            {...register('email')}
            placeholder="Enter your email*"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </Stack>
      </FormControl>
      <Button
        mt={4}
        rounded={'24px'}
        w={'full'}
        bgColor={'tweet.green'}
        textColor={'tweet.putih'}
        _hover={{ bgColor: 'nav.hover' }}
        type="submit"
        // isLoading={mutation.isPending}
      >
        Send Instruction
      </Button>
    </form>
  );
}
