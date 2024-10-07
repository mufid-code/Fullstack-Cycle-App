import { createThreadDTO, updateThreadDTO } from '../dto/thread.dto';
import prisma from '../prisma/prisma';
import { Thread, User } from '@prisma/client';
import { customError, CustomErrorCode } from '../types/custom-error';

class ThreadService {
  // Membuat thread baru
  async createThread(data: createThreadDTO): Promise<Thread | null> {
    return await prisma.thread.create({
      data,
    });
  }

  // Mengambil semua thread
  async getAllThreads(): Promise<Thread[]> {
    return await prisma.thread.findMany({
      include: {
        replies: true,
        likes: true,
        User: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  // Mengambil thread berdasarkan ID
  async getThreadById(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
      where: { id },
      include: {
        replies: true,
        likes: true,
        User: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
    });
    if (!thread) {
      throw {
        status: 404,
        message: 'Thread not found!',
        code: CustomErrorCode.USER_NOT_EXISTS,
      } as customError;
    }
    return thread;
  }

  // Memperbarui thread (hanya pemilik atau admin)
  async updateThread(id: number, data: createThreadDTO) {
    const thread = await prisma.thread.findUnique({ where: { id } });
    if (!thread) {
      throw {
        status: 404,
        message: 'Thread not found',
        code: CustomErrorCode.USER_NOT_EXISTS,
      } as customError;
    }
    return await prisma.thread.update({
      where: { id },
      data: { ...data },
    });
  }

  // Menghapus thread (hanya pemilik atau admin)
  async deleteThread(id: number): Promise<void> {
    const thread = await prisma.thread.findUnique({
      where: { id },
    });

    if (!thread) {
      throw {
        status: 404,
        message: 'Thread not found!',
        code: CustomErrorCode.USER_NOT_EXISTS,
      } as customError;
    }

    await prisma.thread.delete({
      where: { id },
    });
  }

  // Membalas thread (reply)
  async replyToThread(
    threadId: number,
    content: string,
    userId: number
    // imageUrl?: string
  ): Promise<Thread | null> {
    return await prisma.thread.create({
      data: {
        // imageUrl: imageUrl,
        repliesById: threadId,
        userId,
        content,
      },
    });
  }
}

export default new ThreadService();
