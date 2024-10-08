import { Request, Response } from 'express';

import { userSchema } from '../utils/user.schema';
import UserService from '../services/user.service';
import userService from '../services/user.service';
import prisma from '../prisma/prisma';

class UserController {
  async create(req: Request, res: Response) {
    try {
      const value = await userSchema.validateAsync(req.body);

      const user = await userService.createUser(value);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async findAll(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(Number(id));
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }
  async logger(req: Request, res: Response) {
    try {
      const id = (req as any).user.userId;
      const user = await userService.getUserById(Number(id));
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const value = await userSchema.validateAsync(req.body);
      const user = await userService.updateUser(userId, value);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const users = await userService.deleteUser(userId);
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // Search users by username or name
  // async searchUsers(req: Request, res: Response) {
  //   const { query } = req.query;

  //   // Ensure query is a string
  //   if (typeof query !== 'string') {
  //     return res
  //       .status(400)
  //       .json({ error: 'Query parameter must be a string' });
  //   }

  //   try {
  //     const users = await prisma.user.findMany({
  //       where: {
  //         OR: [
  //           { username: { contains: query, mode: 'insensitive' } },
  //           { name: { contains: query, mode: 'insensitive' } },
  //         ],
  //       },
  //     });

  //     res.json(users);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Failed to search users' });
  //   }
  // }
}

export default new UserController();
