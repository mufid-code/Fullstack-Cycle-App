import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../../../../api/api-auth';

// Schema untuk validasi
const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({ token }: { token: string }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // Inisialisasi form dengan validasi schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Mutation untuk reset password
  const mutation = useMutation({
    mutationFn: ({ password, token }: { password: string; token: string }) =>
      resetPassword(password, token),
    onSuccess: () => alert('Password reset successful'),

    onError: (error) => {
      console.error('Error saat reset password:', error);
      alert('Failed to reset password');
    },
  });

  // Fungsi submit form
  const onSubmit = (data: ResetPasswordInputs) => {
    console.log('Data yang dikirim:', data.password);
    console.log('Token:', token);
    // Mutasi dengan password dan token
    mutation.mutate({ password: data.password, token });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.password || !!errors.confirmPassword}>
        <Stack spacing={'12px'}>
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              {...register('password')}
              placeholder="New Password*"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
              >
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && <p>{errors.password.message}</p>}

          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              {...register('confirmPassword')}
              placeholder="Confirm New Password*"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
              >
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </Stack>
      </FormControl>
      <Button
        mt={'15px'}
        w={'full'}
        type="submit"
      >
        Create New Password
      </Button>
    </form>
  );
}
