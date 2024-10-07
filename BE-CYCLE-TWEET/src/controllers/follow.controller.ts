import { Request, Response } from 'express';
import followService from '../services/follow.service';

class FollowerController {
  async follow(req: Request, res: Response) {
    try {
      const followerId = (req as any).user.userId;
      const {followingId} = req.body;
      const follower = await followService.followUser(followerId, Number(followingId));
      if (followerId === followingId) {
        return res.status(400).json({ message: 'You cannot follow yourself' });
      }
      res.status(201).json(follower);
    } catch (error) {
      res.status(500).json({ message: 'Error following user', error });
    }
  }

  async unfollow(req: Request, res: Response) {
    try {
      const followerId = (req as any).user.userId;
      const followingId = Number(req.params.followingId);
      const follow = await followService.unfollowUser(followerId, followingId);
      if (follow.count === 0) {
        return res.status(404).json({ message: 'You are not following this user' });
      }
      res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error unfollowing user', error });
    }
  }

  async getFollowers(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const followers = await followService.getFollowers(userId);
      return res.status(200).json(followers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching followers', error });
    }
  }

  async getFollowing(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const following = await followService.getFollowing(userId);
      return res.status(200).json(following);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching following', error });
    }
  }
}

export default new FollowerController();
