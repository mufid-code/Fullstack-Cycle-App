import prisma from '../prisma/prisma';

class FollowerService {
  async followUser(followerId: number, followingId: number) {
    // Cek apakah sudah follow
    const existingFollower = await prisma.follower.findFirst({
      where: { followerId, followingId }
    });
    if (existingFollower) return existingFollower;

    return await prisma.follower.create({
      data: {
        followerId,
        followingId
      }
    });
  }

  async unfollowUser(followerId: number, followingId: number) {
    return await prisma.follower.deleteMany({
      where: { followerId, followingId }
    });
  }

  async getFollowers(userId: number) {
    return await prisma.follower.findMany({
      where: { followingId: userId },
      include: {
        follower:true
      }
    });
  }

  async getFollowing(userId: number) {
    return await prisma.follower.findMany({
      where: { followerId: userId },
      include: {
        following: true
      }
    });
  }
}

export default new FollowerService();
