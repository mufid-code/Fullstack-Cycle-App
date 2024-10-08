import { Role, TokenType } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import tokenService from '../services/token.service';
import { customError, CustomErrorCode } from '../types/custom-error';

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized!',
    });
  }

  const token = authorizationHeader.split(' ')[1]; // Memperbaiki split(' ') untuk memisahkan Bearer dari token

  if (!token) {
    return res.status(401).json({
      message: 'Authorization token not found!',
    });
  }

  try {
    // const JWT_SECRET = process.env.JWT_SECRET || "ACCESS_TOKEN_SECRET";
    // Verifikasi token
    // const decoded = jwt.verify(token, JWT_SECRET) as { userId: number , };

    // Cek token di database
    const tokenInDb = await tokenService.validateToken(
      token,
      TokenType.ACCESS_TOKEN
    );
    // console.log('auth', tokenInDb);

    if (!tokenInDb) {
      throw {
        code: CustomErrorCode.INVALID_TOKEN,
        message: 'Token is invalid or expired',
        status: 401,
      } as customError;
    }

    // Jika token valid, simpan informasi pengguna di request
    (req as any).user = tokenInDb; // Menyimpan userId ke req untuk digunakan di endpoint selanjutnya
    res.locals.userId = (tokenInDb as any).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error });
  }
}

export function authorize(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!roles.includes(user.role))
      return res.status(403).json({
        message: 'FORBIDDEN ',
      });

    next();
  };
}
