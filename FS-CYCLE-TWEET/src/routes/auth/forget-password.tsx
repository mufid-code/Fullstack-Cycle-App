import { Flex, Link, Text } from '@chakra-ui/react';
import { AuthLayout } from '../../component/layout/app-auth-layout';
import { ForgotPasswordForm } from '../../features/auth/auth-forget/component/forget-password-form';

export default function ForgetPasswordRoute() {
  return (
    <AuthLayout title="Forgot password">
      <ForgotPasswordForm />

      <Flex gap={'4px'}>
        <Text>Already have account?</Text>
        <Link
          href="/login"
          color={'tweet.green'}
        >
          Login
        </Link>
      </Flex>
    </AuthLayout>
  );
}
