import jwt from "jsonwebtoken";
import { TokenType, User } from "@prisma/client";
import crypto from "crypto";
import prisma from "../prisma/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "ACCESS_TOKEN";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "REFRESH_TOKEN";

class TokenService {
  generateToken(payload: object, expiresIn: string, secret: string) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  async createAccessToken(user: User) {
    const payload = { 
      userId: user.id ,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
    };
    const token = this.generateToken(payload, "1d", JWT_SECRET);

    await this.saveToken(user.id, token, TokenType.ACCESS_TOKEN);
    return token;
  }

  async createRefreshToken(user: User)  {
    const payload = { 
      userId: user.id,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
     };
    const refreshToken = this.generateToken(payload, "7d", JWT_REFRESH_SECRET);

    await this.saveToken(user.id, refreshToken, TokenType.REFRESH_TOKEN);
    return refreshToken;
  }

  async saveToken(userId: number, token: string, type: TokenType) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await prisma.token.upsert({
      where: {
        userId_type_unique: {
          userId,
          type,
        },
      },
      update: {
        token: hashedToken,
        expires: new Date(
          Date.now() +
            (type === "ACCESS_TOKEN" ? 15 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000)
        ),
      },
      create: {
        token: hashedToken,
        type,
        userId,
        expires: new Date(
          Date.now() +
            (type === "ACCESS_TOKEN" ? 15 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000)
        ),
      },
    });
  }

  async revokeToken(userId: number, type: TokenType) {
    await prisma.token.deleteMany({
      where: {
        userId,
        type,
      },
    });
  }

  async validateToken(token: string, type: TokenType) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const foundToken = await prisma.token.findFirst({
      where: {
        token: hashedToken,
        type,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!foundToken) {
      return null; // Token tidak valid
    }

    // Verifikasi token menggunakan JWT
    try {
      return jwt.verify(token, type === TokenType.ACCESS_TOKEN ? JWT_SECRET : JWT_REFRESH_SECRET);
    } catch (error) {
      return null; // Token tidak valid
    }
  }

  async createPasswordResetToken(userId: number) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const expires = new Date(Date.now() + 10 * 60 * 1000); // Token expires in 10 minutes

    await prisma.token.upsert({
      where: {
        userId_type_unique: {
          userId,
          type: "PASSWORD_RESET_TOKEN",
        },
      },
      update: {
        token: hashedToken,
        expires,
      },
      create: {
        token: hashedToken,
        type: "PASSWORD_RESET_TOKEN",
        userId,
        expires,
      },
    });

    return resetToken; // return the raw token (unhashed) to send via email
  }

  async validatePasswordResetToken(token: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const passwordResetToken = await prisma.token.findFirst({
      where: {
        token: hashedToken,
        type: "PASSWORD_RESET_TOKEN",
        expires: {
          gt: new Date(), // Check if token has not expired
        },
      },
    });
    return passwordResetToken !== null;
  }
}
export default new TokenService();
