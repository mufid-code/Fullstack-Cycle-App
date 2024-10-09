import { ThreadEntity } from '../app/types/thread-dto';
import {
  CreateThreadDTO,
  repliesInputs,
  threadInputs,
} from '../features/home/schemas/thread-schemas';
import Cookies from 'js-cookie';
import { apiV1 } from './api-config';

// Create a new thread
export const createThread = async (
  data: CreateThreadDTO
): Promise<ThreadEntity> => {
  const formData = new FormData();

  formData.append('content', data.content);
  console.log(data.imageUrl instanceof File, data.imageUrl);

  if (data.imageUrl instanceof FileList) {
    formData.append('imageUrl', data.imageUrl[0]);
  }

  const response = await apiV1.post('/threads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Get all threads
export const getAllThreads = async (): Promise<ThreadEntity[]> => {
  const response = await apiV1.get('/threads');
  return response.data;
};

// Delete a thread by ID
export const deleteThread = async (id: number): Promise<void> => {
  await apiV1.delete(`/threads/${id}`);
};

// Update a thread by ID
export const updateThread = async (
  id: number,
  data: threadInputs
): Promise<ThreadEntity> => {
  const formData = new FormData();
  formData.append('content', data.content);
  if (data.imageUrl instanceof File) {
    formData.append('imageUrl', data.imageUrl);
  }
  const response = await apiV1.put(`/threads/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Get thread by ID
export const getThreadById = async (id: number) => {
  const cookies = Cookies.get('token');
  const response = await apiV1.get(`/threads/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies}`,
    },
  });
  return response.data;
};
// Get thread by ID
export const fetchReplies = async (id: number) => {
  const cookies = Cookies.get('token');
  const response = await apiV1.get(`/threads/${id}/replies`, {
    headers: {
      Authorization: `Bearer ${cookies}`,
    },
  });
  return response.data;
};
// Get Replies by ID
// API Call untuk mengirim balasan
export const createRepliesThread = async (
  threadId: number,
  data: repliesInputs
): Promise<ThreadEntity> => {
  const formData = new FormData();
  formData.append('content', data.content);
  if (data.imageUrl instanceof File) {
    formData.append('imageUrl', data.imageUrl);
  }

  const response = await apiV1.post(`/threads/${threadId}/replies`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
