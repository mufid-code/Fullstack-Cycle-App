import { Request, Response } from 'express';

import {
  forgetPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from '../utils/auth.schema';
import { comparePassword } from '../utils/encryption';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import prisma from '../prisma/prisma';
import bcrypt from 'bcrypt';
import { sendEmail } from '../services/email.service';
import tokenService from '../services/token.service';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      // validation input menggunakan joi
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const existingUser = await userService.findUserByEmail(req.body.email);
      if (existingUser)
        return res.status(400).json({ error: 'Email already exists' });

      const user = await authService.register(value);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  }

  async Login(req: Request, res: Response) {
    try {
      const value = await loginSchema.validateAsync(req.body);

      const user = await authService.LoginUser(value);
      // const token = jwt.sign({ id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }

  async forgetPassword(req: Request, res: Response) {
    const { email } = req.body;

    // Validasi email input
    const { error } = forgetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await authService.findUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User with this email does not exist' });
    }

    const resetToken = await tokenService.createPasswordResetToken(user.id);
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/auth/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Your password reset token',
      text: `You requested a password reset. Please click this link to reset your password: ${resetURL}`,
    });

    return res.status(200).json({ message: 'Token sent to email!' });
  }

  async resetPassword(req: Request, res: Response) {
    const { token, password } = req.body;
    const userId = (req as any).user.id;
    // Validasi input reset password
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const passwordResetToken = await tokenService.validatePasswordResetToken(
      token
    );
    // if (!passwordResetToken) {
    //    res.status(400).json({ message: 'Token is invalid or has expired' });
    // }

    const hashedPassword = await bcrypt.hash(password, 12);

    await authService.updateUserPassword(userId, hashedPassword);

    // Hapus token yang telah digunakan
    await prisma.token.delete({
      where: { id: userId },
    });

    return res.status(200).json({ message: 'Password successfully reset' });
  }
  async check(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;

      const user = await userService.getUserById(userId as number);

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'something wrong', error });
    }
  }
}
export default new AuthController();
