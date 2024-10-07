import prisma from '../prisma/prisma';
import { comparePassword, hashPassword } from '../utils/encryption';
import { LoginDTO, RegisterDTO } from '../dto/auth.dto';
import { User } from '@prisma/client';
import { customError, CustomErrorCode } from '../types/custom-error';
import userService from './user.service';
import jwt from 'jsonwebtoken';
import tokenService from './token.service';

class AuthService {
  async register(data: RegisterDTO): Promise<Omit<User, 'password'> | null> {
    return await prisma.user.create({
      data: {
        ...data,
        password: await hashPassword(data.password),
      },
    });
  }
  async LoginUser(
    data: LoginDTO
  ): Promise<{ user: Omit<User, 'password'>; tokens: any }> {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw {
        code: CustomErrorCode.USER_NOT_EXISTS,
        message: 'Email / password is wrong!',
        status: 404,
      } as customError;
    }

    const isValidPassword = await comparePassword(
      data.password,
      user.password as string
    );

    if (!isValidPassword) {
      throw {
        code: CustomErrorCode.USER_NOT_EXISTS,
        message: 'Email / password is wrong!',
        status: 404,
      } as customError;
    }

    // const { password, ...userToSign } = user;

    // const secretKey = process.env.JWT_SECRET as string;

    // const token = jwt.sign(userToSign, secretKey);

    // // const tokens = await userService.generateTokens(userToSign.id);
    // return {
    //   user: userToSign,
    //   tokens: token,
    // };
    const accessToken = await tokenService.createAccessToken(user);
    const refreshToken = await tokenService.createRefreshToken(user);
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, tokens: { accessToken, refreshToken } };
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUserPassword(userId: number, newPassword: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });
  }
}

export default new AuthService();
