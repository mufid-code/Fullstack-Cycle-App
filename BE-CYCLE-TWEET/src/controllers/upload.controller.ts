import { Request, Response } from 'express';
import prisma from '../prisma/prisma';

// Controller untuk mengubah avatar pengguna
export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const avatarUrl = req.file?.path;

    if (!avatarUrl) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Update avatar di database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });

    res
      .status(200)
      .json({ message: 'Avatar updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'failed to upload image', error });
  }
};

export const media = async (req: Request, res: Response) => {
  try {
    const images = await prisma.thread.findMany({
      where: {
        imageUrl: {
          not: null, // Pastikan hanya thread dengan gambar yang diambil
        },
      },
      select: {
        id: true, // Mengambil ID thread (opsional, untuk referensi lebih lanjut)
        imageUrl: true, // Mengambil hanya kolom imageUrl
        userId: true, //
      },
    });
    // Jika tidak ada gambar, kirimkan pesan informasi
    if (images.length === 0) {
      return res.status(404).json({ message: 'No images found' });
    }

    res.status(201).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error searching media', error });
  }
};
// Fetch all media (threads with media) by userId
export const allMediaById = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const images = await prisma.thread.findMany({
      where: {
        userId: userId,
        imageUrl: { not: null }, // Fetch only threads where imageUrl is not null
      },
      select: {
        id: true,
        content: true,
        imageUrl: true,
        createdAt: true,
        User: {
          select: {
            name: true,
            avatarUrl: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    // Jika tidak ada gambar, kirimkan pesan informasi
    // if (images.length === 0) {
    //   return res.status(404).json({ message: 'No images found' });
    // }
    res.status(201).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error searching media', error });
  }
};
