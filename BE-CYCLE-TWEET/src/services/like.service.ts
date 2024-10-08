import prisma from '../prisma/prisma';

class LikeService {
  async addLike(userId: number, threadId: number) {
    // Cek apakah like sudah ada
    const existingLike = await prisma.like.findFirst({
      where: { userId, threadId },
    });
    if (existingLike) return existingLike;

    return await prisma.like.create({
      data: {
        userId,
        threadId,
      },
    });
  }

  async removeLike(userId: number, threadId: number) {
    return await prisma.like.deleteMany({
      where: { userId, threadId },
    });
  }

  async getLikesByThread(threadId: number) {
    return await prisma.like.findMany({
      where: { threadId },
    });
  }
  // Memeriksa apakah user telah menyukai thread
  async isThreadLikedByUser(userId: number, threadId: number) {
    const like = await prisma.like.findFirst({
      where: {
        userId,
        threadId,
      },
    });
    return !!like; // Return true if liked, false if not
  }
}

export default new LikeService();
