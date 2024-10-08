import prisma from '../prisma/prisma';

class FollowerService {
  async followUser(followerId: number, followingId: number) {
    // Cek apakah sudah follow
    const existingFollower = await prisma.follower.findFirst({
      where: { followerId, followingId },
    });
    if (existingFollower) return existingFollower;

    return await prisma.follower.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async unfollowUser(followerId: number, followingId: number) {
    return await prisma.follower.deleteMany({
      where: { followerId, followingId },
    });
  }

  async getFollowers(userId: number) {
    return await prisma.follower.findMany({
      where: { followingId: userId },
      include: {
        follower: true,
      },
    });
  }

  async getFollowing(userId: number) {
    return await prisma.follower.findMany({
      where: { followerId: userId },
      include: {
        following: true,
      },
    });
  }
  // Method baru untuk mengecek apakah user mengikuti user lain
  async isUserFollowing(followerId: number, followingId: number) {
    const isFollowing = await prisma.follower.findFirst({
      where: { followerId, followingId },
    });
    return !!isFollowing; // Mengembalikan true jika mengikuti, false jika tidak
  }
}

export default new FollowerService();
