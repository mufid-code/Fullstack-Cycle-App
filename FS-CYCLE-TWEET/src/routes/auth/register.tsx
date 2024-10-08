import { Flex, Text } from '@chakra-ui/react';
import { RegisterForm } from '../../features/auth/auth-register/component/register-form';
import { AuthLayout } from '../../component/layout/app-auth-layout';
import { Link } from 'react-router-dom';

export default function RegisterRoute() {
  return (
    <>
      <AuthLayout title="Create account Circle">
        <RegisterForm />
        <Flex gap={'4px'}>
          <Text>Already have account?</Text>
          <Link
            to="/login"
            color={'tweet.green'}
          >
            Login
          </Link>
        </Flex>
      </AuthLayout>
    </>
  );
}
