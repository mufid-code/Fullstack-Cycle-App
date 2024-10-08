import { Request, Response } from 'express';
import followService from '../services/follow.service';
import prisma from '../prisma/prisma';

class searchController {
  async search(req: Request, res: Response) {
    const { query } = req.query;
    if (typeof query !== 'string') {
      return res
        .status(400)
        .json({ error: 'Query parameter must be a string' });
    }
    try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: 'insensitive' } },
            { name: { contains: query, mode: 'insensitive' } },
          ],
        },
      });
      res.status(201).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error searching user', error });
    }
  }
}
export default new searchController();
