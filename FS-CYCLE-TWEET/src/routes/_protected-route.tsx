import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks/use-store';
import { Box, Image, Spinner } from '@chakra-ui/react';

export default function ProtectedRoute() {
  const { user, loading, accessToken } = useAppSelector((state) => state.auth);
  console.log(user);

  if (loading == 'pending') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box textAlign="center">
          <Image
            mb={4}
            h={50}
            src="https://res.cloudinary.com/dje40bx3b/image/upload/v1728317302/circle-image/pc6finzpiepopaudfwtf.png"
            alt="circle logo"
          />
          <Spinner
            h={50}
            w={50}
            mt={4}
          />
        </Box>
      </Box>
    );
  }
  if (accessToken == null) {
    return <Navigate to={'/login'} />;
  }

  if (user.id) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
  if (loading == 'failed') {
    return <Navigate to="/login" />;
  }
}
