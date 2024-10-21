import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoginRequestDTO,
  LoginResponseDTO,
  UserStoreDTO,
} from '../../features/auth/types/dto';
import { apiV1 } from '../../api/api-config';

export const useAuthCheck = createAsyncThunk('users/auth/check', async () => {
  const token = localStorage.getItem('accessToken');
  const response = await apiV1.get<null, { data: UserStoreDTO }>(
    '/auth/check',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

export const useLogin = createAsyncThunk('users/auth/login', async () => {
  try {
    const response = await apiV1.get<
      LoginResponseDTO,
      { data: LoginRequestDTO }
    >('/auth/login');
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
