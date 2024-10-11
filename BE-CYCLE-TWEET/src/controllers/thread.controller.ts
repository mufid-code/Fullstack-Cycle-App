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
      const { content } = req.body; // Mengambil konten balasan dari request body
      const threadId = Number(req.params.id); // Mendapatkan threadId dari params URL
      const userId = (req as any).user.userId; // Mendapatkan userId dari token yang sudah di-decode
      const fileUpload = req.file; // Mengambil file gambar jika ada

      let imageUrl = null;

      // Jika ada file yang di-upload, upload ke Cloudinary
      if (fileUpload) {
        const image = await cloudinaryService.uploadSingle(fileUpload);
        imageUrl = image.secure_url; // Mendapatkan URL dari gambar yang di-upload
      }

      // Membuat objek data yang akan divalidasi dan disimpan
      const value = {
        content,
        imageUrl,
        userId,
      };

      // Validasi data menggunakan ThreadSchema
      const data = await ThreadSchema.validateAsync(value);

      // Menyimpan balasan ke database
      const reply = await ThreadService.replyToThread(data, threadId);

      // Mengembalikan response sukses
      res.status(201).json(reply);
    } catch (error) {
      console.error(error); // Log error ke console untuk debug
      res.status(500).json({ message: 'Failed to reply to thread', error });
    }
  }
  async getReplies(req: Request, res: Response) {
    try {
      const threadId = Number(req.params.id);
      const replies = await ThreadService.getRepliesByThreadId(threadId);
      res.status(200).json(replies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get replies', error });
    }
  }
  // Controller method to fetch threads by userId
  async getThreadsByUserId(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId); // Get userId from the URL params

      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const threads = await ThreadService.getAllThreadsByUserId(userId);

      if (!threads.length) {
        return res
          .status(404)
          .json({ message: 'No threads found for this user' });
      }

      res.status(200).json(threads);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch threads' });
    }
  }
}

export default new ThreadController();
