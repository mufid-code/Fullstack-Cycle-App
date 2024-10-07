// src/api/userApi.ts

import { apiV1 } from './api-config';

export const searchUsers = async (id: string) => {
  const response = await apiV1.get(`/users/{id}`, {
    params: { id },
  });
  return response.data;
};

// Get All Users (Admin Only)
export const getUsers = async () => {
  const response = await apiV1.get('/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include Bearer accessToken if needed
    },
  });
  return response.data;
};

// Get User by ID
export const getUserById = async (id: number) => {
  const response = await apiV1.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};
// Get User by ID
export const getUserByuserId = async () => {
  const response = await apiV1.get(`/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};
// Create User
export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await apiV1.post('/users', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

// Update User
export const updateUser = async (
  id: number,
  data: { name?: string; email?: string; password?: string }
) => {
  const response = await apiV1.put(`/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

// Delete User
export const deleteUser = async (id: number) => {
  const response = await apiV1.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

// Get All Users for Admin
export const getAdminUsers = async () => {
  const response = await apiV1.get('/admin/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};
