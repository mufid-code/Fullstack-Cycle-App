import { apiV1 } from '../api/api-config';
import { UserStoreDTO } from '../features/auth/types/dto';
import { AppRouter } from '../routes';
import { useAppDispatch } from './hooks/use-store';
import { setAuthData } from './store/store-auth-slice';
import { useEffect } from 'react';
function App() {
  const dispatch = useAppDispatch();

  async function checkAuth() {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const { data } = await apiV1.get<null, { data: UserStoreDTO }>(
        '/auth/check',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        setAuthData({
          user: data,
          tokens: {
            accessToken: token,
            refreshToken: localStorage.getItem('refreshToken')!,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);
  return <AppRouter />;
}

export default App;
