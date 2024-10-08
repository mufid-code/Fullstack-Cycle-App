import { Request, Response } from 'express';
import ThreadService from '../services/thread.service';
import { ThreadSchema } from '../utils/thread.schema';
import cloudinaryService from '../services/cloudinary.service';
import threadService from '../services/thread.service';

class ThreadController {
  async create(req: Request, res: Response) {
    try {
      const authorId = (req as any).user.userId;
      const fileUpload = req.file;
      let imageUrl = null;
      console.log(fileUpload);
      if (fileUpload) {
        const image = await cloudinaryService.uploadSingle(
          req.file as Express.Multer.File
        );
        imageUrl = image.secure_url;
      }
      const value = {
        ...req.body,
        imageUrl: imageUrl,
        userId: authorId,
      };
      const data = await ThreadSchema.validateAsync(value);
      const threads = await threadService.createThread(data);
      res.status(201).json(threads);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { error, value } = ThreadSchema.validate(req.body);
      const threadId = Number(req.params.id);

      const updatedThread = await ThreadService.updateThread(threadId, value);
      res.json(updatedThread);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update thread' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const threadId = Number(req.params.id);
      const deleteThread = await ThreadService.deleteThread(threadId);
      res.status(204).json({ message: 'Thread deleted', deleteThread });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete thread' });
    }
  }

  async findByIdThread(req: Request, res: Response) {
    try {
      const threadId = Number(req.params.id);
      const thread = await ThreadService.getThreadById(threadId);
      res.json(thread);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch thread' });
    }
  }

  async findAllThreads(req: Request, res: Response) {
    try {
      const threads = await ThreadService.getAllThreads();
      res.json(threads);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch threads' });
    }
  }

  async reply(req: Request, res: Response) {
    try {
      const { content } = req.body;
      // const imageUrl = req.file?.path;
      const threadId = Number(req.params.id);
      const userId = (req as any).user.userId;

      const reply = await ThreadService.replyToThread(
        threadId,
        content,
        userId
        // imageUrl
      );

      res.status(201).json(reply);
    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: 'Failed to reply to thread', error });
    }
  }
}

export default new ThreadController();
