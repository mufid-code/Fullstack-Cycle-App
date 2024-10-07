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
import { updateUserAvatar } from '../controllers/upload.controller';

import { ThreadSchema } from '../utils/thread.schema';
import { upload } from '../middlewares/upload-file';

export const routerv1 = express.Router();

// Mengecek status autentikasi pengguna
routerv1.get('/auth/check', authentication, authController.check);

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
routerv1.post('/auth/register', authController.register);

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
routerv1.post('/auth/login', authController.Login);

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
routerv1.get('/users/:id', userController.findById);
routerv1.get('/users/search', userController.searchUsers);
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
routerv1.post('/users', userController.create);
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
routerv1.put('/users/:id', userController.update);
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
routerv1.get('/users', authentication, userController.findAll);
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
routerv1.delete(
  '/users/:id',
  authentication,
  authorize(['ADMIN']),
  userController.delete
);
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
routerv1.get(
  '/admin/users',
  authentication,
  authorize(['ADMIN']),
  userController.getUsers
);

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
routerv1.get('/threads', threadController.findAllThreads);
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
routerv1.get('/threads/:id', threadController.findByIdThread);

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
routerv1.post(
  '/threads',
  authentication,
  upload.single('imageUrl'),
  validate(ThreadSchema),
  threadController.create
);
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
routerv1.put('/threads/:id', authentication, threadController.update);
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
routerv1.delete('/threads/:id', authentication, threadController.delete);
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
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
routerv1.post('/threads/:id/replies', authentication, threadController.reply);
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
routerv1.post('/likes', authentication, likeController.addLike);
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
routerv1.delete('/likes/:threadId', authentication, likeController.removeLike);
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
routerv1.get('/likes/thread/:threadId', likeController.getLikesByThread);
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
routerv1.post('/followers', authentication, followController.follow);

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
routerv1.delete(
  '/followers/:followingId',
  authentication,
  followController.unfollow
);

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
routerv1.get('/followers/:userId', followController.getFollowers);

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
routerv1.get('/following/:userId', followController.getFollowing);

/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     summary: Request a password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token sent to email
 *       404:
 *         description: User not found
 */
routerv1.post(
  '/auth/forget-password',
  validate(forgetPasswordSchema),
  authController.forgetPassword
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password successfully reset
 *       400:
 *         description: Token invalid or expired
 */
routerv1.post(
  '/auth/reset-password',
  validate(resetPasswordSchema),
  authController.resetPassword
);

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
routerv1.post(
  '/upload/avatar',
  authentication,
  upload.single('avatar'),
  updateUserAvatar
);

routerv1.get('/users/me', authentication, userController.logger);
