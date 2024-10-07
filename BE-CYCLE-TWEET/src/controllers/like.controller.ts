import { Request, Response } from 'express';
import likeService from '../services/like.service';

class LikeController {
  async addLike(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      // const threadId = Number(req.params.threadId);
      const {threadId} = req.body;
      const like = await likeService.addLike(userId, threadId);
      res.json(like);
    } catch (error) {
      res.status(500).json({ message: 'Error adding like or thread not found', error });
    }
  }

  async removeLike(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const threadId = Number(req.params.threadId);
      const like = await likeService.removeLike(userId, threadId);
      if (like.count === 0) {
        return res.status(404).json({ message: 'Like not found' });
      }

      res.status(200).json({ message: 'Like removed' });
    } catch (error) {
      res.status(500).json({ message: 'Error removing like', error });;
    }
  }

  async getLikesByThread(req: Request, res: Response) {
    try {
      const threadId = Number(req.params.threadId);
      const likes = await likeService.getLikesByThread(threadId);
      res.json(likes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching likes', error });
    }
  }
}

export default new LikeController();
