import { createSlice } from '@reduxjs/toolkit';
import { UserStoreDTO } from '../../features/auth/types/dto';
import Cookies from 'js-cookie';
import { useAuthCheck } from '../thunks/use-Tauth';

// const initialState: UserStoreDTO = {} as UserStoreDTO;
interface AuthState {
  user: UserStoreDTO;
  accessToken: string | null;
  refreshToken: string | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
export const loadAuthData = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken && refreshToken) {
    return { accessToken, refreshToken };
  }

  return { accessToken: null, refreshToken: null };
};

// Saat aplikasi dimulai, Anda bisa memuat data dari localStorage
const { accessToken, refreshToken } = loadAuthData();
const initialState: AuthState = {
  user: {} as UserStoreDTO,
  accessToken,
  refreshToken,
  loading: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(
      state,
      {
        payload,
      }: {
        payload: {
          user: UserStoreDTO;
          tokens: { accessToken: string; refreshToken: string };
        };
      }
    ) {
      state.user = payload.user;
      state.accessToken = payload.tokens.accessToken;
      state.refreshToken = payload.tokens.refreshToken;

      // Simpan token ke localStorage
      localStorage.setItem('accessToken', payload.tokens.accessToken);
      localStorage.setItem('refreshToken', payload.tokens.refreshToken);
    },
    clearAuthData() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // Hapus token dari Cookies
      Cookies.remove('token');

      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(useAuthCheck.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(useAuthCheck.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(useAuthCheck.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
