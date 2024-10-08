import { Flex, Text } from '@chakra-ui/react';
import { AuthLayout } from '../../component/layout/app-auth-layout';
import { LoginForm } from '../../features/auth/auth-login/component/login-form';
import { useAppSelector } from '../../app/hooks/use-store';
import { Link, Navigate } from 'react-router-dom';

export default function LoginRoute() {
  const { user } = useAppSelector((state) => state.auth);
  if (user.id) {
    return <Navigate to={'/'} />;
  }
  return (
    <>
      <AuthLayout title="Login To Circle">
        <LoginForm />
        <Flex gap="4px">
          <Text as="span">Don't have an account yet?</Text>
          <Link
            to="/register"
            color="tweet.green"
          >
            Create account
          </Link>
        </Flex>
      </AuthLayout>
    </>
  );
}
