import { createUserDTO, updateUserDTO } from '../dto/user.dto';
import prisma from '../prisma/prisma';
import bcrypt from 'bcrypt';
import { hashPassword } from '../utils/encryption';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { customError, CustomErrorCode } from '../types/custom-error';

export default new (class UserService {
  async deleteUser(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw {
        status: 404,
        message: 'User not found!',
        code: CustomErrorCode.USER_NOT_EXISTS,
      } as customError;
    }

    return await prisma.user.delete({
      where: { id },
    });
  }
  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany({
      include: {
        likes: true,
        followers: true,
        following: true,
      },
    });
  }
  async getUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        likes: true,
        followers: true,
        following: true,
      },
    });

    if (!user) {
      throw {
        status: 404,
        message: 'User not found!',
        code: CustomErrorCode.USER_NOT_EXISTS,
      } as customError;
    }

    return user;
  }
  async createUser(data: createUserDTO): Promise<User | null> {
    return await prisma.user.create({
      data: {
        ...data,
        password: await hashPassword(data.password),
      },
    });
  }
  async updateUser(userId: number, data: updateUserDTO) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        password: await hashPassword(data.password),
      },
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async generateTokens(userId: number) {
    const accessToken = jwt.sign({ userId }, 'ACCESS_TOKEN', {
      expiresIn: '15m',
    });
    return await prisma.token.create({
      data: {
        token: accessToken,
        type: 'ACCESS_TOKEN',
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 menit
        userId,
      },
    });
  }
})();
