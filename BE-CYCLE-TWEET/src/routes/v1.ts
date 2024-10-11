import express, { Request, Response } from 'express';
import authController from '../controllers/auth.controller';
import { authentication, authorize } from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';
import threadController from '../controllers/thread.controller';
import likeController from '../controllers/like.controller';

import followController from '../controllers/follow.controller';
import validate from '../middlewares/validate';
import {
  forgetPasswordSchema,
  resetPasswordSchema,
} from '../utils/auth.schema';
import {
  allMediaById,
  media,
  updateUserAvatar,
} from '../controllers/upload.controller';

import { ThreadSchema } from '../utils/thread.schema';
import { upload } from '../middlewares/upload-file';
import searchController from '../controllers/search.controller';

export const routerv1 = express.Router();

// Mengecek status autentikasi pengguna
routerv1.get('/auth/check', authentication, authController.check);

routerv1.get('/users/me', authentication, userController.logger);

// AUTH

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with name, email, and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user and return tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tokens returned
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     tags: [Auth]
 *     summary: Request a password reset link
 *     description: Sends a password reset link to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Invalid email format
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password
 *     description: Resets the password for the user with the given token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The password reset token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: NewPassword123!
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Password is required
 *       404:
 *         description: Invalid or expired token
 */

// USER
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with name, email, and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user details
 *     description: Update user information by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// ADMIN

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/:id:
 *   get:
 *     summary: DELETE users
 *     description: Retrieve a list of all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: delete of users byId
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal server error
 */

// THREADS
/**
 * @swagger
 * tags:
 *   name: Thread
 *   description: Thread management
 */
/**
 * @swagger
 * /threads:
 *   get:
 *     summary: Get all threads
 *     tags: [Thread]
 *     responses:
 *       200:
 *         description: A list of threads
 */

/**
 * @swagger
 * /threads/{id}:
 *   get:
 *     summary: Get thread by ID
 *     tags: [Thread]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The thread ID
 *     responses:
 *       200:
 *         description: The thread data
 *       404:
 *         description: Thread not found
 */

/**
 * @swagger
 * /threads:
 *   post:
 *     summary: Create a new thread
 *     tags: [Thread]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *             required:
 *               - content
 *     responses:
 *       201:
 *         description: Thread created successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * '/threads/{id}':
 *       put:
 *         summary: 'update threads by id'
 *         responses:
 *           200:
 *             description: 'A list of threads'
 *           500:
 *             description: 'Internal server error'
 *
 */

/**
 * @swagger
 * /threads/{id}:
 *   delete:
 *     summary: Delete thread by ID
 *     tags: [Thread]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The thread ID
 *     responses:
 *       200:
 *         description: Thread deleted
 *       404:
 *         description: Thread not found
 */

/**
 * @swagger
 * /threads/{id}/replies:
 *   post:
 *     summary: Reply to a thread
 *     tags: [Thread]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The thread ID
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *             required:
 *               - content
 *     responses:
 *       201:
 *         description: Reply created successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /threads/user/{userId}:
 *   get:
 *     summary: Get all threads by a user
 *     tags:
 *        [Thread]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: A list of threads by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "This is a thread"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-01T10:15:30Z"
 *                   imageUrl:
 *                     type: string
 *                     nullable: true
 *                     example: "https://example.com/image.png"
 *                   User:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       avatarUrl:
 *                         type: string
 *                         example: "https://example.com/avatar.png"
 *                   replies:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Thread'
 *                   likes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: integer
 *                           example: 1
 *                         threadId:
 *                           type: integer
 *                           example: 1
 *       404:
 *         description: No threads found for this user
 *       500:
 *         description: Internal server error
 */
// Like
/**
 * @swagger
 * tags:
 *   name: Like
 *   description: Like management
 */

/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Add a like to a thread
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               threadId:
 *                 type: integer
 *             required:
 *               - threadId
 *     responses:
 *       201:
 *         description: Like added successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /likes/{threadId}:
 *   delete:
 *     summary: Remove a like from a thread
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: threadId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The thread ID
 *     responses:
 *       200:
 *         description: Like removed successfully
 *       404:
 *         description: Like not found
 */

/**
 * @swagger
 * /threads/{threadId}/isLiked:
 *   get:
 *     summary: Check if user liked a thread
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: threadId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the thread
 *     responses:
 *       200:
 *         description: Like status retrieved
 */

/**
 * @swagger
 * /likes/thread/{threadId}:
 *   get:
 *     summary: Get all likes for a thread
 *     tags: [Like]
 *     parameters:
 *       - in: path
 *         name: threadId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The thread ID
 *     responses:
 *       200:
 *         description: List of likes for the thread
 */

// Follower
/**
 * @swagger
 * tags:
 *   name: Follower
 *   description: Follower management
 */

/**
 * @swagger
 * /followers:
 *   post:
 *     summary: Follow a user
 *     tags: [Follower]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followingId:
 *                 type: integer
 *             required:
 *               - followingId
 *     responses:
 *       201:
 *         description: Follow successful
 *       400:
 *         description: Invalid data or already following
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /followers/{followingId}:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Follower]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to unfollow
 *     responses:
 *       200:
 *         description: Unfollow successful
 *       404:
 *         description: Not following the user
 */

/**
 * @swagger
 * /followers/{userId}:
 *   get:
 *     summary: Get followers of a user
 *     tags: [Follower]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of followers
 */

/**
 * @swagger
 * /following/{userId}:
 *   get:
 *     summary: Get users followed by a user
 *     tags: [Follower]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of following users
 */

/**
 * @swagger
 * /followers/is-following/{followingId}:
 *   get:
 *     summary: Check if the current user is following another user
 *     tags: [Follower]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to check
 *     responses:
 *       200:
 *         description: Returns true if following, false otherwise
 *       500:
 *         description: Error
 */

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload routes
 */

/**
 * @swagger
 * /upload/avatar:
 *   post:
 *     summary: Upload user avatar
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request or no file uploaded
 */

/** Search Routes **/
// Mencari postingan berdasarkan kata kunci
/**
 * @swagger
 * /search:
 *   get:
 *     summary: Mencari pengguna berdasarkan username atau nama
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: String yang digunakan untuk mencari pengguna.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Daftar pengguna yang ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   avatarUrl:
 *                     type: string
 *       400:
 *         description: Parameter query harus berupa string
 *       500:
 *         description: Terjadi kesalahan saat mencari pengguna
 */

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Get all uploaded images
 *     description: Retrieve all images that have been uploaded.
 *     responses:
 *       200:
 *         description: A list of image URLs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The image ID.
 *                       imageUrl:
 *                         type: string
 *                         description: The URL of the uploaded image.
 *       404:
 *         description: No images found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /threads/{id}/replies:
 *   get:
 *     summary: Mendapatkan balasan dari thread
 *     description: Mendapatkan daftar balasan untuk sebuah thread berdasarkan ID
 *     tags:
 *       - Thread
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID dari thread
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Balasan dari thread berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   content:
 *                     type: string
 *                     description: Konten balasan
 *                   imageUrl:
 *                     type: string
 *                     description: URL gambar opsional
 *                   userId:
 *                     type: integer
 *                     description: ID dari pengguna yang membuat balasan
 *       404:
 *         description: Thread tidak ditemukan
 *       500:
 *         description: Gagal mendapatkan balasan
 */

// #AUTHS
routerv1.post('/auth/forget-password', authController.forgetPassword);
routerv1.post('/auth/reset-password/:token', authController.resetPassword);
routerv1.post('/auth/login', authController.Login);
routerv1.post('/auth/register', authController.register);

//  #THREADS
routerv1.put('/threads/:id', authentication, threadController.update);
routerv1.post(
  '/threads',
  authentication,
  upload.single('imageUrl'),
  // validate(ThreadSchema),
  threadController.create
);
routerv1.get('/threads/:id', threadController.findByIdThread);
routerv1.get('/threads', threadController.findAllThreads);

routerv1.post(
  '/threads/:id/replies',
  authentication,
  upload.single('imageUrl'),
  threadController.reply
);

routerv1.get(
  '/threads/:id/replies',
  authentication,
  threadController.getReplies
);

routerv1.delete('/threads/:id', authentication, threadController.delete);

// USERS [admin]
routerv1.get(
  '/admin/users',
  authentication,
  authorize(['ADMIN']),
  userController.getUsers
);
routerv1.delete(
  '/users/:id',
  authentication,
  authorize(['ADMIN']),
  userController.delete
);
// USERS [user]
routerv1.get('/users', authentication, userController.findAll);
routerv1.put('/users/:id', userController.update);
routerv1.post('/users', userController.create);
routerv1.get('/users/:id', userController.findById);

routerv1.get(
  '/search',
  authentication,
  searchController.search.bind(searchController)
);

// FOLLOWERS
routerv1.get('/followers/:userId', followController.getFollowers);
routerv1.delete(
  '/followers/:followingId',
  authentication,
  followController.unfollow
);
routerv1.post('/followers', authentication, followController.follow);

routerv1.get(
  '/followers/is-following/:followingId',
  authentication,
  followController.isFollowing
);
routerv1.get('/following/:userId', followController.getFollowing);

// LIKES
routerv1.get('/likes/thread/:threadId', likeController.getLikesByThread);
routerv1.get(
  '/threads/:threadId/isLiked',
  authentication,
  likeController.isThreadLiked
);
routerv1.delete('/likes/:threadId', authentication, likeController.removeLike);
routerv1.post('/likes', authentication, likeController.addLike);

// MEDIA
routerv1.get('/images', media);
routerv1.post(
  '/upload/avatar',
  authentication,
  upload.single('avatar'),
  updateUserAvatar
);

/**
 * @swagger
 * /media/user/{userId}:
 *   get:
 *     summary: Get all media by a user
 *     tags:
 *       - Media
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: A list of media by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "This is a thread with media"
 *                   imageUrl:
 *                     type: string
 *                     example: "https://example.com/image.png"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-01T10:15:30Z"
 *                   User:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       avatarUrl:
 *                         type: string
 *                         example: "https://example.com/avatar.png"
 *       404:
 *         description: No media found for this user
 *       500:
 *         description: Internal server error
 */
routerv1.get('/media/user/:userId', allMediaById);

routerv1.get('/threads/user/:userId', threadController.getThreadsByUserId);
