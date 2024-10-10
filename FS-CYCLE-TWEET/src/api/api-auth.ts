import {
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
} from '../features/auth/types/dto';

import { apiRequest } from './api-service';

export const login = (data: LoginRequestDTO): Promise<LoginResponseDTO> => {
  return apiRequest<LoginResponseDTO>({
    method: 'POST',
    url: '/auth/login',
    data,
  });
};
export const registerData = (
  data: RegisterRequestDTO
): Promise<RegisterResponseDTO> => {
  return apiRequest<RegisterResponseDTO>({
    method: 'POST',
    url: '/auth/register',
    data,
  });
};

export const sendPasswordResetEmail = async (email: string) => {
  const response = await fetch(
    'http://localhost:8000/api/v1/auth/forget-password',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to send email.');
  }

  return await response.json();
};

export const resetPassword = async (
  data: { password: string },
  token: string
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/auth/reset-password/${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to reset password.');
  }

  return await response.json();
};
